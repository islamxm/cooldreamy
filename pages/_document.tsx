import { Html, Head, Main, NextScript } from 'next/document'



export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'anonymous'}/>
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet"/>


        <script
          type='text/javascript'
          async
          dangerouslySetInnerHTML={{
            __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-59CJTBH')
                `
              }}
          />
          
        <script
          type='text/javascript' 
          async 
          src="https://www.googletagmanager.com/gtag/js?id=G-PZMJLXVY1B"/> 
          <script 
            type='text/javascript' 
            async 
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-PZMJLXVY1B'); 
              `
            }}
           />
        <script
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

          <script
              dangerouslySetInnerHTML={{
                  __html: `console.log('asdasd')`
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
