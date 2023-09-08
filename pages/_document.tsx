import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'



export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'anonymous'}/>
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet"/>

        <meta name="application-name" content="Cool dreamy"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
        <meta name="apple-mobile-web-app-title" content="Cool dreamy"/>
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

        {/* <Script
          id='gtm-script-2'
          src='https://www.googletagmanager.com/gtag/js?id=G-PZMJLXVY1B'
          /> */}
        {/* <Script
          id='gtm-script-3'
          >
            {
              `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-PZMJLXVY1B');`
            }
        </Script> */}
        <Script
          id='gtm-script-1'
          >
            {
              `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-59CJTBH')`
            }
        </Script>

        <Script
          id='ym-script-1'
          type='text/javascript'
          async
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]function(){(m[i].a=m[i].a[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(94454907, "init", {
                 clickmap:true,
                 trackLinks:true,
                 accurateTrackBounce:true,
                 webvisor:true
            });`
          }}  
          />
        <Script
          id='ym-script-2'
          async
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        
            ym(94454907, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
            });`
          }}
          />
        <Script
          id='fb-pixel-1'
          async
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');; "‌")
            fbq('init', '618085683724877');
            fbq('track', 'PageView');`
          }}
          />
        <Script
          id='twitter-pixel-1'
          async
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','ogcsq');`
          }}
          />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1"
            src="https://www.facebook.com/tr?id=618085683724877&ev=PageView
            &noscript=1"/>`
          }}
          />
        <noscript
            dangerouslySetInnerHTML={{
                __html: `<div><img src="https://mc.yandex.ru/watch/94454907" style="position:absolute; left:-9999px;" alt="" /></div>`
            }}
          />
      </Head>
      <body>
        <Main />
        <NextScript />
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-59CJTBH"
        height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
      </body>
    </Html>
  )
}
