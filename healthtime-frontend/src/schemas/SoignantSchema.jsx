import { z } from "zod";

// Define regex for phone number validation and password strength requirements if needed
const phoneRegex = /^[0-9]{10}$/;

const soignantSchema = z.object({
  nom: z.string().min(1, "Le nom est requis."),
  prenom: z.string().min(1, "Le prénom est requis."),
  sexe: z.enum(["homme", "femme"], "Le sexe est requis."),
  dateNaissance: z.string().min(1, "La date de naissance est requise."),
  telephone: z
    .string()
    .regex(phoneRegex, "Le téléphone est invalide."),
  email: z.string().email("Email invalide."),
  adresse: z.string().min(1, "L'adresse est requise."),
  password: z.string().min(8, "Le mot de passe doit comporter au moins 8 caractères."),
  confirmPassword: z.string().min(8, "La confirmation du mot de passe est requise."),
  tarif: z.number().positive("Le tarif doit être un nombre positif."),
  ville: z.number().min(1, "La ville est requise."),
  specialites: z.array(z.number()).nonempty("Au moins une spécialité est requise."),
  certificat: z
    .string()
    .min(1, "Le certificat est requis.")
    .regex(/^data:image\/(jpeg|png|jpg);base64,/, "Certificat invalide, téléchargez une image.")
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Les mots de passe ne correspondent pas.",
});

export default soignantSchema;
