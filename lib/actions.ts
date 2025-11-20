"use server";

import prisma from "./prisma";

export async function CreateUser() {
   try {
      await prisma.user.create({
         data: {
            name: "Nazar Kyselov",
            email: "kyselovno@gmail.com"
         },
      });
   } catch (err) {
      console.error("Shit happened... Would you mind cleaning?", err);
      return {
			message: "Database Error: Failed to Create Invoice.",
		};
   }
}