const users = {
  documentUID: {
    authProvider: 'local',
    email: 'janedoe@gmail.com',
    name: 'johndoe1',
    uid: 'cleXAMJVJYgxCEDsLXYZTjbLMui2',
  },
}

const profiles = {
  documentUID: {
    createdAt: new Date(),
    email: 'janedoe@gmail.com',
    favorites: ['guideId1', 'guideId2'],
    githubUrl: 'url',
    isAdmin: false,
    isBanned: false,
    userId: 'cleXAMJVJYgxCEDsLXYZTjbLMui2',
    username: 'wannaB3',
  },
}

const guides = {
  documentUID: {
    apis: ['test1', 'test2'],
    backEnd: ['test3', 'test4'],
    createdAt: new Date(),
    favorites: 4,
    files: [
      {
        codeBlock: 'code here',
        fileName: 'index.js',
        language: 'javascript',
        references: [
          {
            header: 'imports',
            text: 'React, redux',
          },
          {
            header: 'hooks',
            text: 'useEffect, useState',
          },
          {
            header: 'event handlers',
            text: 'how to handle events',
          },
          {
            header: 'jsx',
            text: "here's what we render",
          },
        ],
      },
      {
        codeBlock: 'code here',
        fileName: 'main.css',
        language: 'css',
        references: [
          {
            header: 'typography',
            text: 'p, h1, h2, h3, h4, h5, h6',
          },
        ],
      },
      {
        codeBlock: 'code here',
        fileName: 'api.js',
        language: 'javascript',
        references: [
          {
            header: 'express routes',
            text: "here's our express and sequelize",
          },
        ],
      },
    ],
    frontEnd: ['test5', 'test6'],
    githubUrl: 'url',
    isPublic: true,
    isPublished: true,
    tags: ['test7', 'test8', 'test9'],
    title: 'how to log in and mean it',
    userId: 'cleXAMJVJYgxCEDsLXYZTjbLMui2',
    username: 'jankyCode',
  },
}
