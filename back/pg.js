const categories = [
  {
    id: 1,
    label: "divers",
  },
  {
    id: 2,
    label: "Arts and entertainment",
  },
  {
    id: 3,
    label: "Cars & Other vehicles",
  },
  {
    id: 4,
    label: "Computer science",
  },
  {
    id: 5,
    label: "Education and communications",
  },
  {
    id: 6,
    label: "Family life",
  },
  {
    id: 7,
    label: "Finance and business",
  },
  {
    id: 8,
    label: "Food and cooking",
  },
  {
    id: 9,
    label: "Health",
  },
  {
    id: 10,
    label: "Hobbies and crafts",
  },
  {
    id: 11,
    label: "Holidays and traditions",
  },
  {
    id: 12,
    label: "Home and garden",
  },
  {
    id: 13,
    label: "Music and instruments",
  },
];

const writers = [
  {
    blogLabel: "Starcraft 2 jokes",
    category: {
      id: 1,
      label: "divers",
    },
    createdAt: "2023-06-08T20:47:43.137Z",
    description: "Awesome description",
    email: "mail@mail.com",
    id: 1,
    password: "awesomePassword",
    pseudo: "eclectik",
    role: "writer",
  },
  {
    blogLabel: "Better call sall good man",
    category: {
      id: 1,
      label: "divers",
    },
    createdAt: "2023-06-08T20:49:19.220Z",
    description: "Best description",
    email: "email@email.com",
    id: 2,
    password: "betterPassword",
    pseudo: "tichlog",
    role: "writer",
  },
  {
    blogLabel: "Music is the language of emotion",
    category: {
      id: 13,
      label: "Music and instruments",
    },
    createdAt: "2023-06-10T20:02:31.069Z",
    description: "Passionné de musique et de randonnée",
    email: "musiquepassion@example.com",
    id: 3,
    password: "$2a$10$n9o6DwFoqER1uh0MHqXRBeGtBwuHWr.Pnt12jpQRcTt86hbkbz8Cq",
    pseudo: "MusiquePassion",
    role: "writer",
  },
  {
    blogLabel: "Freeze time to capture the perfect moment",
    category: {
      id: 2,
      label: "Arts and entertainment",
    },
    createdAt: "2023-06-10T20:03:55.409Z",
    description: "Amateur de photographie et de voyages",
    email: "VoyagePhoto@example.com",
    id: 4,
    password: "$2a$10$i0ETuhEyyRze0OgDqEZCGeGp3npYbfaUPqIkpGllMeiUaFG0y7AsO",
    pseudo: "PhotoVoyage",
    role: "writer",
  },
  {
    blogLabel: "Try hard and if it does not work, try harder",
    category: {
      id: 4,
      label: "Computer science",
    },
    createdAt: "2023-06-10T20:04:43.574Z",
    description: "Fan de technologie et de jeux vidéo.",
    email: "TechnoGamer@example.com",
    id: 5,
    password: "$2a$10$J4WxRwrCwtSXmkkwhAQbtuUmpbfwKYXs/HmYFeIeuaR0fKNzMUL82",
    pseudo: "TechnoGamer",
    role: "writer",
  },
  {
    blogLabel: "skynet is close...",
    category: {
      id: 4,
      label: "Computer science",
    },
    createdAt: "2023-06-10T20:05:58.963Z",
    description:
      "Passionné par la programmation et l'intelligence artificielle.",
    email: "CodeIA@example.com",
    id: 6,
    password: "$2a$10$wy30jLTrF9fQaHWJTa/NdutQ5jgO3NxmAGp66uS9InAhWuxqIVGmS",
    pseudo: "CodeIA",
    role: "writer",
  },
  {
    blogLabel: "Nature as so much more to offer than macdonalds...",
    category: {
      id: 12,
      label: "Home and garden",
    },
    createdAt: "2023-06-10T20:06:48.724Z",
    description: "Amateur de jardinage et de cuisine.",
    email: "JardinCuisine@example.com",
    id: 7,
    password: "$2a$10$xcvjngRWoyopx/9yj5R3I.btBPlB9ESHJOwTuSmY4SeftA35rYzre",
    pseudo: "JardinCuisine",
    role: "writer",
  },
  {
    blogLabel: "No pain no gain",
    category: {
      id: 1,
      label: "divers",
    },
    createdAt: "2023-06-10T20:07:56.350Z",
    description: "Accro au fitness et aux sports d'endurance.",
    email: "FitnessEndurance@example.com",
    id: 8,
    password: "$2a$10$x2ctIiKfngQEnoAqn11eUuS8YI0kV6Y0X.Qa458i7esdpgEcQ1vcy",
    pseudo: "FitnessEndurance",
    role: "writer",
  },
  {
    blogLabel: "Build muscle, don't destry your body!",
    category: {
      id: 9,
      label: "Health",
    },
    createdAt: "2023-06-10T20:08:39.808Z",
    description: "Passionné de musculation et de nutrition.",
    email: "MuscuNutrition@example.com",
    id: 9,
    password: "$2a$10$QYiC/4NKYmOu3HvqzQygy.5QHzdhmQf5nBzbTeFas.w/BmF54bBhS",
    pseudo: "MuscuNutrition",
    role: "writer",
  },
];

const articles = [
  {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ligula eget nisi ullamcorper tempus. Curabitur dapibus tortor in felis posuere, at malesuada urna mattis. Duis aliquam scelerisque mauris, id tempus nulla. Suspendisse ultricies arcu eu dolor tincidunt, ut aliquam justo vestibulum. Vestibulum eu rutrum sem. Sed feugiat aliquam feugiat.",
    createdAt: "2023-06-10T20:22:58.559Z",
    id: 2,
    isPublished: true,
    label: "Article 1",
    publishedBy: {
      email: "musiquepassion@example.com",
      id: 3,
    },
  },
  {
    content:
      "Nulla feugiat enim id tristique aliquet. Phasellus a nisl vitae est tincidunt semper sed et sapien. Integer rhoncus urna non justo feugiat, vel feugiat mauris semper. Curabitur et felis sed nisl consectetur ullamcorper. Vestibulum consequat lacinia sem a malesuada. Quisque interdum mi ligula, in eleifend ligula bibendum vitae.",
    createdAt: "2023-06-10T20:23:10.070Z",
    id: 3,
    isPublished: true,
    label: "Article 2",
    publishedBy: {
      email: "musiquepassion@example.com",
      id: 3,
    },
  },
  {
    content:
      "Fusce non lacus eu tellus malesuada euismod. Aliquam sit amet sem erat. Phasellus rutrum metus a urna commodo, vitae ullamcorper leo lacinia. Integer feugiat efficitur tincidunt. Curabitur sit amet orci ac elit vestibulum ultrices non eget odio. Sed dignissim turpis eget eros lacinia, vel pulvinar urna tempus.",
    createdAt: "2023-06-10T20:23:19.665Z",
    id: 4,
    isPublished: false,
    label: "Article 3",
    publishedBy: {
      email: "musiquepassion@example.com",
      id: 3,
    },
  },
  {
    content:
      "Vivamus lacinia erat et vulputate pellentesque. Praesent id velit enim. Sed placerat ante eget ipsum scelerisque, nec lobortis elit efficitur. Etiam dapibus, sem vel dapibus facilisis, sapien dui tempor enim, ut aliquam erat ligula non est. Integer ac fringilla leo. Duis consectetur vestibulum mauris, nec suscipit velit faucibus vitae.",
    createdAt: "2023-06-10T20:23:29.004Z",
    id: 5,
    isPublished: true,
    label: "Article 4",
    publishedBy: {
      email: "musiquepassion@example.com",
      id: 3,
    },
  },
  {
    content:
      "Pellentesque ultricies, leo at gravida luctus, mi dui ullamcorper risus, eu rhoncus ex libero non leo. Fusce vitae scelerisque nisl. Nunc lacinia, mauris id ultricies eleifend, nisi sem condimentum ante, id ullamcorper mi sapien eu lectus. Nullam ut ante bibendum, cursus odio eu, varius justo. Sed dapibus ac lacus vitae pulvinar.",
    createdAt: "2023-06-10T20:23:37.339Z",
    id: 6,
    isPublished: true,
    label: "Article 5",
    publishedBy: {
      email: "musiquepassion@example.com",
      id: 3,
    },
  },
  {
    content:
      "Morbi faucibus leo velit, vitae condimentum nisl rhoncus ac. Proin ullamcorper interdum mauris, nec facilisis turpis tempus nec. Maecenas tristique consectetur nisi, sed elementum mauris aliquet id. Aenean dapibus turpis a sem varius, eu vestibulum quam ultrices. Curabitur facilisis nunc id metus posuere, et volutpat risus viverra.",
    createdAt: "2023-06-10T20:35:40.621Z",
    id: 7,
    isPublished: true,
    label: "Article 8",
    publishedBy: {
      email: "MuscuNutrition@example.com",
      id: 9,
    },
  },
  {
    content:
      "Suspendisse ut orci et velit tincidunt ultrices. Nam semper, nisl nec laoreet feugiat, diam erat blandit orci, vel pulvinar nisl velit id lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur pretium leo a pulvinar rhoncus. Nunc volutpat malesuada odio, eget faucibus nulla cursus non.",
    createdAt: "2023-06-10T20:35:52.465Z",
    id: 8,
    isPublished: false,
    label: "Article 9",
    publishedBy: {
      email: "MuscuNutrition@example.com",
      id: 9,
    },
  },
  {
    content:
      "Vestibulum at enim ac orci malesuada vestibulum. Nam sed lectus et nunc tincidunt volutpat. Fusce pretium risus enim, nec efficitur urna scelerisque id. Ut tincidunt turpis vel quam venenatis, in facilisis arcu placerat. Cras nec tellus nec ipsum cursus gravida vitae eu nibh. Morbi finibus sapien nec vulputate tristique.",
    createdAt: "2023-06-10T20:36:01.508Z",
    id: 9,
    isPublished: true,
    label: "Article 10",
    publishedBy: {
      email: "MuscuNutrition@example.com",
      id: 9,
    },
  },
  {
    content:
      "Aliquam suscipit odio in tincidunt luctus. Ut consectetur tincidunt orci, vitae luctus arcu tristique nec. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris fringilla eleifend risus. Donec blandit consectetur sapien, at varius ante mollis non. Maecenas eget nisl ultricies, congue mauris vel, malesuada turpis.",
    createdAt: "2023-06-10T20:36:39.478Z",
    id: 10,
    isPublished: true,
    label: "Article 11",
    publishedBy: {
      email: "MuscuNutrition@example.com",
      id: 9,
    },
  },
  {
    content:
      "Curabitur vulputate orci non luctus efficitur. Quisque venenatis odio vitae mi vulputate pellentesque. Etiam rhoncus posuere gravida. Donec volutpat commodo sem, nec rutrum nulla pellentesque vel. Vestibulum ac tincidunt justo. Sed ut convallis justo. Fusce rutrum, ligula sit amet ullamcorper tincidunt, purus metus tempor tellus, sed elementum lectus nisi eu ipsum.",
    createdAt: "2023-06-10T20:41:07.062Z",
    id: 11,
    isPublished: true,
    label: "Article 12",
    publishedBy: {
      email: "FitnessEndurance@example.com",
      id: 8,
    },
  },
  {
    content:
      "In hac habitasse platea dictumst. Mauris lacinia vulputate quam, ut auctor quam facilisis eget. Vestibulum sit amet ex dolor. Integer volutpat turpis nec felis hendrerit, at consectetur metus tristique. Nam luctus arcu ac neque aliquet, nec sollicitudin tellus gravida. Fusce efficitur est vitae urna eleifend cursus. Nam commodo erat non ullamcorper efficitur.",
    createdAt: "2023-06-10T20:41:19.945Z",
    id: 12,
    isPublished: true,
    label: "Article 13",
    publishedBy: {
      email: "FitnessEndurance@example.com",
      id: 8,
    },
  },
  {
    content:
      "Phasellus eget bibendum sapien. Sed ac mi massa. Nulla facilisi. In ullamcorper, ex sit amet sagittis eleifend, eros mauris vehicula urna, at posuere velit velit sed felis. Sed faucibus tellus vel felis venenatis luctus. Phasellus dapibus sem non eros malesuada, sed bibendum lacus sagittis. Sed fermentum eu magna sed ullamcorper.",
    createdAt: "2023-06-10T20:41:33.141Z",
    id: 13,
    isPublished: true,
    label: "Article 14",
    publishedBy: {
      email: "FitnessEndurance@example.com",
      id: 8,
    },
  },
  {
    content:
      "Integer sollicitudin sapien nunc, eu elementum est fringilla sit amet. Sed eu augue vitae est dictum eleifend nec vitae metus. Aliquam erat volutpat. Nunc eleifend libero in dolor condimentum, id lobortis sem pellentesque. Praesent scelerisque est sit amet diam feugiat, at rhoncus leo fermentum. Integer a lacus faucibus, gravida lorem ac, iaculis nisi.",
    createdAt: "2023-06-10T20:41:39.970Z",
    id: 14,
    isPublished: true,
    label: "Article 15",
    publishedBy: {
      email: "FitnessEndurance@example.com",
      id: 8,
    },
  },
];

const token_musique =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3cml0ZXJJZCI6Mywid3JpdGVyUm9sZSI6IndyaXRlciIsIndyaXRlckVtYWlsIjoibXVzaXF1ZXBhc3Npb25AZXhhbXBsZS5jb20iLCJpYXQiOjE2ODcyOTA3MDJ9.xXdZFno3shlNQdtpIWaGHAE_ZoxUnXMoMSRb6adeOsw";

const token_muscu =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3cml0ZXJJZCI6OSwid3JpdGVyRW1haWwiOiJNdXNjdU51dHJpdGlvbkBleGFtcGxlLmNvbSIsIndyaXRlclJvbGUiOiJ3cml0ZXIiLCJpYXQiOjE2ODY0MjkyOTd9.EYCVhqTXz_Su58UJUF-P9Rl9V1n9fd7ylgo638WWPHc";

const token_fitness =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3cml0ZXJJZCI6OCwid3JpdGVyRW1haWwiOiJGaXRuZXNzRW5kdXJhbmNlQGV4YW1wbGUuY29tIiwid3JpdGVyUm9sZSI6IndyaXRlciIsImlhdCI6MTY4NjQyOTU4Mn0.SOC-213TUXekU8ftKy9eRBCIfUvLmnvODg9R0q8rO90";

const token_voyage_photo =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3cml0ZXJJZCI6NCwid3JpdGVyUm9sZSI6IndyaXRlciIsIndyaXRlckVtYWlsIjoiVm95YWdlUGhvdG9AZXhhbXBsZS5jb20iLCJpYXQiOjE2ODczNjI3NjV9.O0M5N_fFUVaji4lZHgj0ALIvqtkWCESjvXCeDlufDtI";
