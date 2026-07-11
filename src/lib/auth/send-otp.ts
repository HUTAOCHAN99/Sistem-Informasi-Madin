// src/lib/auth/send-otp.ts
//
// Pengiriman kode OTP ke admin. Untuk sekarang BELUM disambungkan ke
// penyedia email/WhatsApp asli — kode hanya dicetak ke terminal server
// (console.log), dan kalau OTP_DEV_MODE=true dikirim balik ke UI supaya
// gampang dites tanpa setup SMTP/WA gateway dulu.
//
// Langkah menyambungkan ke pengiriman asli nanti, contoh dengan email
// (nodemailer + SMTP, atau Resend/SendGrid):
//
//   import nodemailer from "nodemailer";
//   const transporter = nodemailer.createTransport({ ...konfigurasi SMTP });
//   await transporter.sendMail({
//     to: email,
//     subject: "Kode OTP Login Madin",
//     text: `Kode OTP kamu: ${code} (berlaku 5 menit)`,
//   });
//
// atau dengan WhatsApp gateway (mis. Fonnte/Wablas, umum dipakai di
// Indonesia): kirim HTTP POST ke endpoint gateway dengan nomor admin & isi
// pesan berisi `code`.

export async function sendOtpEmail(email: string, code: string) {
  const devMode = process.env.OTP_DEV_MODE !== "false"; // default: true

  // Simulasi pengiriman — ganti bagian ini dengan integrasi asli nanti.
  // eslint-disable-next-line no-console
  console.log(`[OTP] Kode untuk ${email}: ${code} (berlaku 5 menit)`);

  return { devMode, devCode: devMode ? code : undefined };
}
