import { Html, Head, NextScript, Main } from 'next/document'

const _document = () => {
  return (
    <Html>
      <Head>
        {/* Bootstrap JS */}
        <script 
          defer
          src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js' integrity='sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa' crossOrigin='anonymous'
        >
        </script>

        {/* Bootstrap Icons */}
        <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css' />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default _document
