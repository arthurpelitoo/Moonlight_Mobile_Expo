export type ValidationRule = {
    label: string;
    test: (inputData: string) => boolean; //recebe pasw de string na função e devolve um booleano
}