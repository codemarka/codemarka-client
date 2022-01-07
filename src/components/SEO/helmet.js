/** @format */

import React from 'react'
import Helmet from 'react-helmet'

export default function helmet({follow = true,lang,title,metaDescription,pathname,image,children}) {
    return (
        <Helmet
            htmlAttributes={ {
                lang: lang || 'en'
            } }
            title={
                title
                    ? title
                    : 'Codemarka'
            }
            titleTemplate={ `${ title ? title :
                'Codemarka' }` }
            meta={ [
                {
                    name: 'description',
                    content:
                        metaDescription  ? metaDescription :
                        'A virtual and collaborative environment for code lovers.'
                },
                {
                    property: 'og:title',
                    content: title
                        ? title
                        : 'Codemarka'
                },
                {
                    property: 'og:url',
                    content: 'https://codemarka.co'
                },

                {
                    property: 'og:description',
                    content:
                        metaDescription ? metaDescription :
                                               'A virtual and collaborative environment for code lovers.'
                },
                {
                    property: 'og:type',
                    content: 'website'
                },
                {
                    name: 'twitter:card',
                    content: 'summary'
                },
                {
                    name: 'twitter:creator',
                    content: '@codemon_'
                },
                {
                    name: 'twitter:title',
                    content: title
                        ? title
                        : 'Codemarka'
                },
                {
                    name: 'og:site_name',
                    content: 'codemarka'
                },
                {
                    name: 'og:locale',
                    content: 'en'
                },
                {
                    name: 'og:image',
                    content:
                        image ||
                        'https://res.cloudinary.com/ogwugo-people/image/upload/v1577469153/dark.png'
                },
                {
                    name: 'twitter:description',
                    content:
                        metaDescription ? metaDescription : 
                        'A virtual and collaborative environment for code lovers.'
                }
            ] }>
            {children}
            <link
                rel="canonical"
                href={ `https://codemarka/${ pathname || '' }` }
            />
            <meta
                name="robots"
                content={ 'follow' }
            />
        </Helmet>
    )
}
