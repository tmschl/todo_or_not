export const resetPasswordTemplate = (token, id) => {
  return `
    <html>
      <h1>Reset your password</h1>
      <p>Click <a target="_blank" href="http://localhost:3000/reset-password/${token}/${id}">Here</a></p>
    </html>
  `
}