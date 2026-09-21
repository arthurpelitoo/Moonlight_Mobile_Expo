# Desenvolvimento Mobile — Emulador e Celular Físico (Expo/Android)

> Guia de ambiente para rodar o app mobile (Expo) em desenvolvimento,
> cobrindo os dois cenários possíveis: emulador Android (Android Studio)
> e celular físico via USB. Escrito a partir da experiência real de setup
> no Arch/CachyOS, mas os passos do Expo/adb valem para qualquer distro Linux
> (só os comandos de pacote mudam).

## Visão geral: por que dois cenários existem

O Metro Bundler (servidor de desenvolvimento do Expo/React Native) roda no
seu PC, numa porta local (`8081` por padrão). O app — seja emulador ou
celular físico — precisa **alcançar essa porta** para baixar o bundle JS e,
se seu app faz chamadas a uma API local (ex: backend na porta `3000`),
também precisa alcançar essa outra porta.

- **Emulador Android**: roda na mesma máquina que o Metro, então nunca
  depende de rede real — usa loopback/bridge interna do próprio Android
  Studio. É o caminho mais simples, sem setup extra.
- **Celular físico**: é um dispositivo separado, então precisa de uma forma
  real de alcançar o PC — normalmente via Wi-Fi (mesma rede), mas isso
  depende de roteador, firewall, e às vezes simplesmente não funciona. A
  alternativa mais confiável é **USB**, usando `adb reverse` para mapear as
  portas do PC diretamente no celular via cabo, ignorando a rede por completo.

Este guia cobre os dois.

---

## Parte 1 — Emulador Android (caminho simples)

### Pré-requisitos
- Android Studio instalado, com um AVD (Android Virtual Device) já criado
  (ex: Pixel 8, API mais recente).
- Projeto Expo com dependências instaladas (`npm install`).

### Rodando
```bash
npx expo start
```
No menu interativo do terminal, aperte `a` para abrir no Android, ou use
`--android` direto:
```bash
npx expo start --android
```
Se o emulador não estiver aberto ainda, o Expo tenta abrir um automaticamente
(se só houver um AVD configurado) ou pergunta qual usar.

### Quando algo dá errado aqui
- **Emulador não aparece na lista**: abra o Android Studio > Device Manager
  e confirme que o AVD existe e não está corrompido.
- **API local (backend) não responde no emulador**: o emulador Android usa o
  endereço especial `10.0.2.2` para se referir ao `localhost` do PC
  hospedeiro — não `127.0.0.1` nem `localhost` diretamente. Se seu código
  resolve a URL da API dinamicamente (recomendado, ver Parte 3), isso já é
  tratado automaticamente.

---

## Parte 2 — Celular físico via USB (quando Wi-Fi falha ou não é confiável)

Use este caminho quando:
- `expo start` funciona liso no emulador, mas o celular físico trava ou dá
  erro tipo `Uncaught Error: java.io.IOException: Failed to download remote update`.
- Você não quer depender da estabilidade do Wi-Fi/firewall da rede local.

### Diagnóstico rápido (antes de qualquer configuração)
```bash
adb devices          # celular aparece?
lsusb                 # celular aparece no nível de hardware USB?
```
Se `lsusb` já reconhece o aparelho (ex: `Samsung Electronics Co., Ltd Galaxy
series, misc. (MTP mode)`) mas `adb devices` não lista nada além do
emulador, o problema é permissão (`udev`) ou Depuração USB desativada no
celular — não é hardware nem cabo.

### Setup passo a passo (Arch/CachyOS — adapte o gerenciador de pacotes para sua distro)

**1. Instalar regras udev** (o pacote certo é `android-udev`, não
`android-udev-rules` — esse último não existe no Arch, é um engano comum):
```bash
sudo pacman -S android-udev
sudo udevadm control --reload-rules
sudo udevadm trigger
```
Desconecte e reconecte o cabo USB depois disso.

> Em outras distros: Ubuntu/Debian geralmente já vem com regras udev via
> `android-sdk-platform-tools-common`; se não tiver, procure um pacote
> equivalente a `android-udev-rules` no seu gerenciador.

**2. Ativar Depuração USB no celular:**
- Ajustes > Sobre o telefone > toque 7x em "Número da compilação" até
  aparecer "Você agora é um desenvolvedor".
- Volte e entre em "Opções do desenvolvedor" (geralmente no fim da lista de
  Ajustes, ou dentro de "Ajustes gerais").
- Ative o interruptor **Depuração USB**.
- Reconecte o cabo — deve aparecer um popup no celular pedindo para
  autorizar a depuração USB com a impressão digital RSA do seu PC. Marque
  "Sempre permitir deste computador" e aceite.

**3. Confirmar que o adb enxerga o celular:**
```bash
adb kill-server && adb start-server && adb devices
```
Deve listar o celular (ex: `R9XR209CZZK  device`), possivelmente junto de um
`emulator-5554` se o emulador também estiver rodando.

> Se não aparecer mesmo com udev instalado e depuração ativa, confira se o
> modo de conexão USB do celular está em **"Transferência de arquivos
> (MTP)"** e não em "Apenas carregamento" — sem isso, o Android não expõe a
> interface de depuração de jeito nenhum.

**4. Mapear as portas do PC no celular via cabo:**

Com dois dispositivos conectados (emulador + celular), sempre especifique
com `-s <serial>`, senão o comando falha com
`adb: more than one device/emulator`:
```bash
adb -s <SERIAL_DO_CELULAR> reverse tcp:8081 tcp:8081   # Metro bundler
adb -s <SERIAL_DO_CELULAR> reverse tcp:3000 tcp:3000   # API/backend local
```
Troque `3000` pela porta real da sua API, e repita a linha para qualquer
outra porta que seu app precise alcançar (ex: um serviço de dashboards numa
porta diferente).

**5. Abrir o Expo forçando `localhost`:**

Por padrão, o Expo tenta anunciar o Metro pelo IP da rede local
(`192.168.x.x`), que o `adb reverse` **não intercepta** — o reverse só
redireciona chamadas para `localhost`/`127.0.0.1`. Force o modo localhost:
```bash
npx expo start --localhost
```
Se o Expo Go ainda tentar abrir pelo IP da rede (às vezes fica em cache),
digite manualmente na barra de URL do próprio app Expo Go:
```
exp://localhost:8081
```

### Comandos do dia a dia (depois que o setup inicial já foi feito uma vez)

Toda vez que reconectar o celular numa sessão nova de trabalho:
```bash
adb devices                                             # confirma o serial
adb -s <SERIAL> reverse tcp:8081 tcp:8081
adb -s <SERIAL> reverse tcp:3000 tcp:3000
npx expo start --localhost
```

---

## Parte 3 — Resolvendo a URL da API automaticamente (funciona nos dois cenários)

Para não precisar trocar a URL da API manualmente toda vez que alternar
entre emulador e celular físico, resolva o host dinamicamente a partir do
Metro:

```ts
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getDynamicHost = (): string => {
  if (Platform.OS === 'web') {
    const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    return `http://${host}:3000`;
  }

  // hostUri vem como "192.168.1.42:8081" ou "localhost:8081" ou "127.0.0.1:8081"
  const hostUri = Constants.expoConfig?.hostUri;
  const resultIp = hostUri ? hostUri.split(':')[0] : '10.0.2.2'; // fallback = emulador

  return `http://${resultIp}:3000`;
};

export const API_URL = process.env.EXPO_PUBLIC_API_URL || getDynamicHost();
```

Isso cobre os três casos automaticamente:
- **Emulador sem `hostUri`**: cai no fallback `10.0.2.2` (endereço especial
  do emulador para o localhost do PC).
- **Wi-Fi normal**: `hostUri` vem como `192.168.x.x:8081`, extrai o IP da
  rede.
- **USB com `--localhost`**: `hostUri` vem como `localhost:8081` ou
  `127.0.0.1:8081`, que combinado com o `adb reverse` já mapeado, aponta
  certo para o PC via cabo.

> ⚠️ Isso não funciona sozinho para `expo-secure-store` — no navegador (web)
> essa lib não tem implementação e lança erro. Se seu app também roda no
> Expo Web, trate esse caso separadamente (storage adaptado por
> `Platform.OS`, ou simplesmente não use `SecureStore` fora do fluxo
> nativo).

---

## Troubleshooting geral (aplica-se aos dois cenários)

| Sintoma | Causa provável | Solução |
|---|---|---|
| Erro Metro genérico após mover/renomear arquivos de rota | Cache do Metro com caminhos antigos | `npx expo start -c` (limpa cache) |
| Nada muda mesmo limpando cache do Metro | Cache do Expo persistente | `rm -rf node_modules/.cache .expo` e reiniciar |
| Warnings de rota "No route named X exists" | Nome de `Drawer.Screen`/`Stack.Screen` não bate com a estrutura real de pastas (ex: depois de mover arquivos para um grupo) | Ajustar o `name` para incluir o caminho completo do grupo, ex: `"(protected)/profile"` |
| App física conectada mas `adb devices` não lista nada | udev não instalado ou Depuração USB desativada | Ver Parte 2, passos 1 e 2 |
| `adb: more than one device/emulator` | Emulador e celular conectados ao mesmo tempo | Sempre usar `-s <serial>` nos comandos adb |
| API não responde só no navegador (Expo Web), funciona no Android | CORS — portas diferentes contam como origens diferentes para o navegador | Configurar `cors()` no backend liberando a origem do front (ex: `http://localhost:8081`) |

---

## Checklist rápido para começar uma sessão de trabalho

- [ ] Backend rodando na porta esperada (ex: `3000`)
- [ ] **Emulador**: `npx expo start --android` — pronto, sem mais nada
- [ ] **Celular via USB**: cabo conectado → `adb devices` confirma serial →
      `adb reverse` das portas necessárias → `npx expo start --localhost`
