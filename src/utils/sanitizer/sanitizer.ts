export function sanitizeData<Data extends object>(data: Data): Data {  
   
  const entries = Object.entries(data).map(([key, value]) => {  
    
    if (typeof value !== "string") return [key, value];

    let clean = value.trim(); 
    if (key === "cpf") clean = clean.replace(/\D/g, "");
    if (key === "email") clean = clean.toLowerCase();

    return [key, clean];
  });

  return Object.fromEntries(entries) as Data;
}