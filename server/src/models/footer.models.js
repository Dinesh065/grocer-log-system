import mongoose from "mongoose";

const FooterLinkSchema = new mongoose.Schema({
    label: { type: String, required: true },
    url: { type: String, required: true }
  });
  
export const FooterLink = mongoose.model('FooterLink', FooterLinkSchema)