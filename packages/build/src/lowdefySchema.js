export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://lowdefy.com/appSchema.json',
  type: 'object',
  title: 'Lowdefy App Schema',
  definitions: {
    action: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'type'],
      properties: {
        async: {
          type: 'boolean',
          errorMessage: {
            type: 'Action "async" should be a boolean.',
          },
        },
        id: {
          type: 'string',
          errorMessage: {
            type: 'Action "id" should be a string.',
          },
        },
        messages: {},
        params: {},
        skip: {},
        type: {
          type: 'string',
          errorMessage: {
            type: 'Action "type" should be a string.',
          },
        },
      },
      errorMessage: {
        type: 'Action should be an object.',
        required: {
          id: 'Action should have required property "id".',
          type: 'Action should have required property "type".',
        },
      },
    },
    app: {
      type: 'object',
      additionalProperties: false,
      properties: {
        html: {
          type: 'object',
          errorMessage: {
            type: 'App "app.html" should be an object.',
          },
          properties: {
            appendBody: {
              type: 'string',
              errorMessage: {
                type: 'App "app.html.appendBody" should be a string.',
              },
            },
            appendHead: {
              type: 'string',
              errorMessage: {
                type: 'App "app.html.appendHead" should be a string.',
              },
            },
          },
        },
      },
    },
    authConfig: {
      type: 'object',
      additionalProperties: false,
      errorMessage: {
        type: 'App "config.auth" should be an object.',
      },
      properties: {
        openId: {
          type: 'object',
          additionalProperties: false,
          errorMessage: {
            type: 'App "config.auth.openId" should be an object.',
          },
          properties: {
            rolesField: {
              type: 'string',
              description: '.',
              errorMessage: {
                type: 'App "config.auth.openId.rolesField" should be a string.',
              },
            },
            logoutRedirectUri: {
              type: 'string',
              description:
                'The URI to redirect the user to after logout. Can be a Nunjucks template string with client_id, host, id_token_hint, and openid_domain as template data.',
              errorMessage: {
                type: 'App "config.auth.openId.logoutRedirectUri" should be a string.',
              },
            },
            scope: {
              type: 'string',
              description: 'The OpenID Connect scope to request.',
              default: 'openid profile email',
              errorMessage: {
                type: 'App "config.auth.openId.scope" should be a string.',
              },
            },
          },
        },
        pages: {
          type: 'object',
          additionalProperties: false,
          errorMessage: {
            type: 'App "config.auth.pages" should be an object.',
          },
          properties: {
            protected: {
              type: ['array', 'boolean'],
              errorMessage: {
                type: 'App "config.auth.pages.protected.$" should be an array of strings.',
              },
              items: {
                type: 'string',
                description:
                  'Page ids for which authentication is required. When specified, all unspecified pages will be public.',
                errorMessage: {
                  type: 'App "config.auth.pages.protected.$" should be an array of strings.',
                },
              },
            },
            public: {
              type: ['array', 'boolean'],
              errorMessage: {
                type: 'App "config.auth.pages.public.$" should be an array of strings.',
              },
              items: {
                type: 'string',
                description:
                  'Page ids for which authentication is not required. When specified, all unspecified pages will be protected.',
                errorMessage: {
                  type: 'App "config.auth.pages.public.$" should be an array of strings.',
                },
              },
            },
            roles: {
              type: 'object',
              patternProperties: {
                '^.*$': {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  errorMessage: {
                    type: 'App "config.auth.pages.roles.[role]" should be an array of strings.',
                  },
                },
              },
              errorMessage: {
                type: 'App "config.auth.pages.roles" should be an object.',
              },
            },
          },
        },
        jwt: {
          type: 'object',
          additionalProperties: false,
          errorMessage: {
            type: 'App "config.auth.jwt" should be an object.',
          },
          properties: {
            expiresIn: {
              type: ['string', 'number'],
              default: '4h',
              description:
                'The length of time a user token should be valid. Can be expressed as a number in seconds, or a vercel/ms string (https://github.com/vercel/ms)',
              errorMessage: {
                type: 'App "config.auth.jwt.expiresIn" should be a string or number.',
              },
            },
            loginStateExpiresIn: {
              type: ['string', 'number'],
              default: '5min',
              description:
                'The length of time an authorization request token should be valid. Can be expressed as a number in seconds, or a vercel/ms string (https://github.com/vercel/ms)',
              errorMessage: {
                type: 'App "config.auth.jwt.loginStateExpiresIn" should be a string or number.',
              },
            },
          },
        },
        providers: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'type'],
            properties: {
              id: {
                type: 'string',
                errorMessage: {
                  type: 'Auth provider "id" should be a string.',
                },
              },
              type: {
                type: 'string',
                errorMessage: {
                  type: 'Auth provider "type" should be a string.',
                },
              },
              properties: {
                type: 'object',
              },
            },
            errorMessage: {
              type: 'Auth provider should be an object.',
              required: {
                id: 'Auth provider should have required property "id".',
                type: 'Auth provider should have required property "type".',
              },
            },
          },
        },
        theme: {
          type: 'object',
        },
      },
    },
    block: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'type'],
      properties: {
        id: {
          type: 'string',
          errorMessage: {
            type: 'Block "id" should be a string.',
          },
        },
        type: {
          type: 'string',
          errorMessage: {
            type: 'Block "type" should be a string.',
          },
        },
        field: {
          type: 'string',
          errorMessage: {
            type: 'Block "field" should be a string.',
          },
        },
        properties: {
          type: 'object',
        },
        layout: {
          type: 'object',
          errorMessage: {
            type: 'Block "layout" should be an object.',
          },
        },
        skeleton: {
          type: 'object',
          errorMessage: {
            type: 'Block "skeleton" should be an object.',
          },
        },
        style: {
          type: 'object',
          errorMessage: {
            type: 'Block "style" should be an object.',
          },
        },
        visible: {},
        loading: {},
        blocks: {
          type: 'array',
          items: {
            $ref: '#/definitions/block',
          },
          errorMessage: {
            type: 'Block "blocks" should be an array.',
          },
        },
        requests: {
          type: 'array',
          items: {
            $ref: '#/definitions/request',
          },
          errorMessage: {
            type: 'Block "requests" should be an array.',
          },
        },
        required: {},
        validate: {
          type: 'array',
          items: {
            type: 'object',
            errorMessage: {
              type: 'Block "validate" should be an array of objects.',
            },
          },
          errorMessage: {
            type: 'Block "validate" should be an array.',
          },
        },
        events: {
          type: 'object',
          patternProperties: {
            '^.*$': {
              anyOf: [
                {
                  type: 'array',
                  items: {
                    $ref: '#/definitions/action',
                  },
                },
                {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    try: {
                      type: 'array',
                      items: {
                        $ref: '#/definitions/action',
                      },
                    },
                    catch: {
                      type: 'array',
                      items: {
                        $ref: '#/definitions/action',
                      },
                    },
                    debounce: {
                      type: 'object',
                      additionalProperties: false,
                      properties: {
                        immediate: {
                          type: 'boolean',
                          errorMessage: {
                            type: 'Event "debounce.immediate" should be an boolean.',
                          },
                        },
                        ms: {
                          type: 'number',
                          errorMessage: {
                            type: 'Event "debounce.ms" should be a number.',
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
          errorMessage: {
            type: 'Block "events" should be an object.',
          },
        },
        areas: {
          type: 'object',
          patternProperties: {
            '^.*$': {
              type: 'object',
              properties: {
                blocks: {
                  type: 'array',
                  items: {
                    $ref: '#/definitions/block',
                  },
                  errorMessage: {
                    type: 'Block "areas.{areaKey}.blocks" should be an array.',
                  },
                },
              },
              errorMessage: {
                type: 'Block "areas.{areaKey}" should be an object.',
              },
            },
          },
          errorMessage: {
            type: 'Block "areas" should be an object.',
          },
        },
      },
      errorMessage: {
        type: 'Block should be an object.',
        required: {
          id: 'Block should have required property "id".',
          type: 'Block should have required property "type".',
        },
      },
    },
    connection: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'type'],
      properties: {
        id: {
          type: 'string',
          errorMessage: {
            type: 'Connection "id" should be a string.',
          },
        },
        type: {
          type: 'string',
          errorMessage: {
            type: 'Connection "type" should be a string.',
          },
        },
        properties: {
          type: 'object',
          errorMessage: {
            type: 'Connection "properties" should be an object.',
          },
        },
      },
      errorMessage: {
        type: 'Connection should be an object.',
        required: {
          id: 'Connection should have required property "id".',
          type: 'Connection should have required property "type".',
        },
      },
    },
    menu: {
      type: 'object',
      additionalProperties: false,
      required: ['id'],
      properties: {
        id: {
          type: 'string',
          errorMessage: {
            type: 'Menu "id" should be a string.',
          },
        },
        properties: {
          type: 'object',
          errorMessage: {
            type: 'Menu "properties" should be an object.',
          },
        },
        links: {
          type: 'array',
          items: {
            $ref: '#/definitions/menuItem',
          },
          errorMessage: {
            type: 'Menu "links" should be an array.',
          },
        },
      },
      errorMessage: {
        type: 'Menu should be an object.',
        required: {
          id: 'Menu should have required property "id".',
        },
      },
    },
    menuGroup: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'type'],
      properties: {
        id: {
          type: 'string',
          errorMessage: {
            type: 'MenuGroup "id" should be a string.',
          },
        },
        type: {
          type: 'string',
          errorMessage: {
            type: 'MenuGroup "type" should be a string.',
          },
        },
        properties: {
          type: 'object',
          errorMessage: {
            type: 'MenuGroup "properties" should be an object.',
          },
        },
        links: {
          type: 'array',
          items: {
            $ref: '#/definitions/menuItem',
          },
          errorMessage: {
            type: 'MenuGroup "links" should be an array.',
          },
        },
      },
      errorMessage: {
        type: 'MenuGroup should be an object.',
        required: {
          id: 'MenuGroup should have required property "id".',
          type: 'MenuGroup should have required property "type".',
        },
      },
    },
    menuItem: {
      anyOf: [
        {
          $ref: '#/definitions/menuGroup',
        },
        {
          $ref: '#/definitions/menuLink',
        },
      ],
    },
    menuLink: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'type'],
      properties: {
        id: {
          type: 'string',
          errorMessage: {
            type: 'MenuLink "id" should be a string.',
          },
        },
        type: {
          type: 'string',
          errorMessage: {
            type: 'MenuLink "type" should be a string.',
          },
        },
        pageId: {
          type: 'string',
          errorMessage: {
            type: 'MenuLink "pageId" should be a string.',
          },
        },
        url: {
          type: 'string',
          errorMessage: {
            type: 'MenuLink "url" should be a string.',
          },
        },
        properties: {
          type: 'object',
          errorMessage: {
            type: 'MenuLink "properties" should be an object.',
          },
        },
      },
      errorMessage: {
        type: 'MenuLink should be an object.',
        required: {
          id: 'MenuLink should have required property "id".',
          type: 'MenuLink should have required property "type".',
        },
      },
    },
    plugin: {
      type: 'object',
      additionalProperties: false,
      required: ['name', 'version'],
      properties: {
        name: {
          type: 'string',
          errorMessage: {
            type: 'Plugin "name" should be a string.',
          },
        },
        version: {
          type: 'string',
          errorMessage: {
            type: 'Plugin "version" should be a string.',
          },
        },
        typePrefix: {
          type: 'string',
          errorMessage: {
            type: 'Plugin "typePrefix" should be a string.',
          },
        },
      },
      errorMessage: {
        type: 'Plugin should be an object.',
        required: {
          name: 'Plugin should have required property "name".',
          version: 'Plugin should have required property "version".',
        },
      },
    },
    request: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'type', 'connectionId'],
      properties: {
        id: {
          type: 'string',
          errorMessage: {
            type: 'Request "id" should be a string.',
          },
        },
        type: {
          type: 'string',
          errorMessage: {
            type: 'Request "type" should be a string.',
          },
        },
        connectionId: {
          type: 'string',
          errorMessage: {
            type: 'Request "connectionId" should be a string.',
          },
        },
        payload: {
          type: 'object',
          errorMessage: {
            type: 'Request "payload" should be an object.',
          },
        },
        properties: {
          type: 'object',
          errorMessage: {
            type: 'Request "properties" should be an object.',
          },
        },
      },
      errorMessage: {
        type: 'Request should be an object.',
        required: {
          id: 'Request should have required property "id".',
          type: 'Request should have required property "type".',
          connectionId: 'Request should have required property "connectionId".',
        },
      },
    },
  },
  additionalProperties: false,
  required: ['lowdefy'],
  properties: {
    name: {
      type: 'string',
      errorMessage: {
        type: 'App "name" should be a string.',
      },
    },
    lowdefy: {
      type: 'string',
      errorMessage: {
        type: 'Lowdefy version in field "lowdefy" should be a string.',
      },
    },
    license: {
      type: 'string',
      errorMessage: {
        type: 'App "license" should be a string.',
      },
    },
    app: {
      $ref: '#/definitions/app',
    },
    auth: {
      $ref: '#/definitions/authConfig',
    },
    cli: {
      type: 'object',
      errorMessage: {
        type: 'App "cli" should be an object.',
      },
    },
    config: {
      type: 'object',
      errorMessage: {
        type: 'App "config" should be an object.',
      },
      additionalProperties: false,
      properties: {
        basePath: {
          type: 'string',
          description: 'App base path to apply to all routes. Base path must start with "/".',
          errorMessage: {
            type: 'App "config.basePath" should be a string.',
          },
        },
        homePageId: {
          type: 'string',
          description:
            'Page id to use as homepage. When visiting home route "/", the router will redirect to this page. If not provided, the first page in default or first menu will be used as the homePageId.',
          errorMessage: {
            type: 'App "config.homePageId" should be a string.',
          },
        },
        theme: {
          type: 'object',
          errorMessage: {
            type: 'App "config.theme" should be an object.',
          },
          properties: {
            lessVariables: {
              type: 'object',
              description: 'App theme less variables.',
              errorMessage: {
                type: 'App "config.theme.lessVariables" should be an object.',
              },
            },
          },
        },
      },
    },
    plugins: {
      type: 'array',
      items: {
        $ref: '#/definitions/plugin',
      },
      errorMessage: {
        type: 'App "plugins" should be an array.',
      },
    },
    global: {
      type: 'object',
      errorMessage: {
        type: 'App "global" should be an object.',
      },
    },
    connections: {
      type: 'array',
      items: {
        $ref: '#/definitions/connection',
      },
      errorMessage: {
        type: 'App "connections" should be an array.',
      },
    },
    menus: {
      type: 'array',
      items: {
        $ref: '#/definitions/menu',
      },
      errorMessage: {
        type: 'App "menus" should be an array.',
      },
    },
    pages: {
      type: 'array',
      items: {
        $ref: '#/definitions/block',
      },
      errorMessage: {
        type: 'App "pages" should be an array.',
      },
    },
  },
  errorMessage: {
    type: 'Lowdefy configuration should be an object.',
    required: {
      lowdefy: 'Lowdefy configuration should have required property "lowdefy".',
    },
  },
};
