import { NextResponse } from "next/server";

import { mailOptions, transporter } from "@/lib/mail";

export const POST = async (request: any) => {
  const { username, phone, email, message } = await request.json();

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: "Новий запит на зворотній телефонний дзвоник",
      html: `<ul>
                <li>Ім'я абонента: <b>${username}<b/></li>
                <li>Контактний номер абонента: <b>${phone}<b/></li>
                <li>Eлектронна скриня абонента: <b>${email}<b/></li>
                <li>Tекст повідомлення: <b>${message}<b/></li>
            </ul>`,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
};

// export const POST = async (request: any}) => {
//   const {username, phone, email, message } = await request.json();

//   try {
//     await transporter.sendMail({
//       ...mailOptions,
//       subject: "Новий запит на зворотній телефонний дзвоник",
//       html: `<p>Ім'я абонента - ${username}, контактний номер абонента - ${phone}</p>`,
//     });

//     return NextResponse.json({ success: true });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ error: err.message }, { status: err.status });
//   }
// };
