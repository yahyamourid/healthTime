import { z } from "zod";

const patientSchema = z.object({

  nom: z.string().min(1, { message: "Nom est requis" }),
  prenom: z.string().min(1, { message: "Prénom est requis" }),
  sexe: z.enum(["homme", "femme"], { message: "Sélectionnez un sexe" }),
  // dateInscription:z.string(),
  dateNaissance: z.string().refine((date) => {
    const today = new Date();
    const birthDate = new Date(date);
    return birthDate < today;
  }, { message: "Date de naissance invalide" }),
  telephone: z.string().length(10, { message: "Téléphone doit avoir 10 chiffres" }),
  adresse: z.string().min(1, { message: "Adresse est requise" }),
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Mot de passe doit avoir au moins 6 caractères" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export default patientSchema