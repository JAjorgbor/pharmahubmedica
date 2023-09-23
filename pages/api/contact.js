import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, message } = req.body

    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_PASSWORD,
      },
    })
    // production password lyxxacdxatscepfx
    // sandbox password kquxcwhvqfugidok
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: 'Website Contact Form Submission',
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    }

    try {
      await transporter.sendMail(mailOptions)
      res.status(200).json({ message: 'Email sent successfully!' })
    } catch (error) {
      console.error('Error sending email:', error)
      res.status(500).json({ error })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
