import { z } from "zod";

const AddressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: z.object({ lat: z.string(), lng: z.string() }),
});

const CompanySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  address: AddressSchema,
  phone: z.string(),
  website: z.string(),
  company: CompanySchema,
});

export { UserSchema };
