module.exports = async function (context, req) {
  const { nombre, email, empresa, mensaje, website } = req.body || {};

  // honeypot anti-spam
  if (website) {
    context.res = { status: 200, body: "OK" };
    return;
  }

  if (!nombre || !email || !mensaje) {
    context.res = { status: 400, body: "Faltan campos obligatorios." };
    return;
  }

  context.bindings.message = {
    personalizations: [{ to: [{ email: "hola@asesoria-irene.com" }] }],
    from: { email: "no-reply@asesoria-irene.com" },
    subject: `Nueva consulta web: ${nombre}`,
    content: [{
      type: "text/plain",
      value:
`Nombre: ${nombre}
Email: ${email}
Empresa: ${empresa || "-"}
Mensaje:
${mensaje}`
    }]
  };

  context.res = { status: 200, body: "Enviado" };
};
