import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'



export default function Document() {
  return (
    <Html lang="ru">
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=''/>
      <link href="https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800&family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet"/>

        <meta name="application-name" content="Cool Dreamy"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
        <meta name="apple-mobile-web-app-title" content="Cool Dreamy"/>
        <meta name="description" content="Dating for a relationship"/>
        <meta name="format-detection" content="telephone=no"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        {/* <meta name="msapplication-config" content="/icons/browserconfig.xml" /> */}
        <meta name="msapplication-TileColor" content="#2B5797"/>
        <meta name="msapplication-tap-highlight" content="no"/>
        <meta name="theme-color" content="#7d5eec"/>

        <link rel="apple-touch-icon" href="/touch-icon-iphone.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/touch-icon-ipad.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/touch-icon-iphone-retina.png"/>
        <link rel="apple-touch-icon" sizes="167x167" href="/touch-icon-ipad-retina.png"/>

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5"/>
        
        {/* <link rel="shortcut icon" href="/favicon.ico"/> */}

        {/* <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="PWA App" />
        <meta name="twitter:description" content="Best PWA App in the world" />
        <meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PWA App" />
        <meta property="og:description" content="Best PWA App in the world" />
        <meta property="og:site_name" content="PWA App" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" /> */}
        
        

        {/* <noscript
            dangerouslySetInnerHTML={{
                __html: `<div><img src="https://mc.yandex.ru/watch/94454907" style="position:absolute; left:-9999px;" alt="" /></div>`
            }}
          /> */}
        <script
          async
          id='gtm-1'
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-59CJTBH');`
          }}
          >
        </script>
      </Head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-59CJTBH"
        height="0" width="0" style={{display: 'none', visibility: 'hidden'}}></iframe></noscript>
      
        
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
