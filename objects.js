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
    guides: {
      guideID1: true,
      guideID2: true,
    },
    email: 'janedoe@gmail.com',
    favorites: {
      guideId1: true,
      guideId2: true,
    },
    githubUrl: 'url',
    isAdmin: false,
    isBanned: false,
    userId: 'cleXAMJVJYgxCEDsLXYZTjbLMui2',
  },
}

const guides = {
  documentUID: {
    body: {
      fileId1: true,
      fileId2: true,
      fileId3: true,
    },
    createdAt: new Date(),
    favorites: 675,
    githubUrl: 'url',
    head: {
      apis: {
        axios: true,
        'code-mirror': true,
      },
      backEnd: {
        express: true,
        node: true,
        postgresql: true,
      },
      frontEnd: {
        'material UI': true,
        react: true,
        redux: true,
      },
      tags: {
        axios: true,
        'code-mirror': true,
        express: true,
        node: true,
        postgresql: true,
        'material UI': true,
        react: true,
        redux: true,
      },
    },
    title: 'how to log in and mean it',
    isPublished: true,
    userId: 'cleXAMJVJYgxCEDsLXYZTjbLMui2',
  },
}

const files = {
  codeBlock: 'code goes here',
  fileName: 'index.js',
  // guideId1: true,
  // cleXAMJVJYgxCEDsLXYZTjbLMui2: true,
  guide: 'guideId1',
  userId: 'cleXAMJVJYgxCEDsLXYZTjbLMui2',
  // references:{
  //   "Event Listeners": "here's what's going ot happen",
  //   hooks: "just keep hooking",
  //   imports: "explanation",
  //   jsx: "what's really going on"
  // },
  references: {
    1: {
      'Event Listeners': "here's what's going ot happen",
    },
    2: {
      hooks: 'just keep hooking',
    },
    3: {
      imports: 'explanation',
    },
    4: {
      jsx: "what's really going on",
    },
  },
}
