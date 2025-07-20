import { Achievement } from "@/utils/achievement";
import { getAchievementPlayer } from "@/utils/player";
import { get } from "http";

export const season1Achievements: Achievement[] = [
  {
    title: "Najlepszy gracz s2",
    subtitle: "Winrate %",
    description:
      "Do ostatniej chwili nie wiedziałem komu przyznać, bo umówmy się 14 gieriek to i ja mógłbym rozjebać, prawda? No właśnie nie, dlatego gratulacje dla nowego mistrza",
    performers: [
      getAchievementPlayer("Hitari", "71,43%"),
      getAchievementPlayer("DeiDaRa", "66,67%"),
      getAchievementPlayer("Blazeoon", "65,38%"),
    ],
  },
  {
    title: "KDA Player",
    subtitle: "Najlepsze KDA",
    description: "Kampcie sobie dalej",
    performers: [
      getAchievementPlayer("Hitari", "1.51"),
      getAchievementPlayer("Blazeoon", "1.38"),
      getAchievementPlayer("DeiDaRa", "1.35"),
    ],
  },
  {
    title: "ADR na maksa",
    subtitle: "Najlepszy ADR",
    description: "Piotrek to pechowiec sezonu, trzeba to sobie powiedzieć",
    performers: [
      getAchievementPlayer("Cpt. Chicken", "89.91"),
      getAchievementPlayer("Hitari", "89.5"),
      getAchievementPlayer("Blazeoon", "88.68"),
    ],
  },
  {
    title: "Bania, bania",
    subtitle: "HS %",
    description: "Precyzyjni są panowie",
    performers: [
      getAchievementPlayer("fy_pool_day enjoyer", "52.03%"),
      getAchievementPlayer("vinicjusz", "50.56%"),
      getAchievementPlayer("DeiDaRa", "49.55%"),
    ],
  },
  {
    title: "Przestępca",
    subtitle: "Najwięcej killi na mecz",
    description:
      "Hip hip hura. Kurwancka już za bardzo nwm co napisać, a jeszcze z 40 tych pucharków przede mną",
    performers: [
      getAchievementPlayer("Hitari", "18.79"),
      getAchievementPlayer("DeiDaRa", "18.58"),
      getAchievementPlayer("Cpt. Chicken", "17.89"),
    ],
  },
  {
    title: "Przyczyna",
    subtitle: "Najwięcej śmierci",
    description:
      "Wyjebać się to nie jest wstyd, ważne by później wstać i znowu się wyjebać",
    performers: [
      getAchievementPlayer("vinicjusz", "16.3"),
      getAchievementPlayer("VEGETAble", "16.26"),
      getAchievementPlayer("EMUNIA", "16.1"),
    ],
  },
  {
    title: "Toni Kroos",
    subtitle: "Najwięcej asyst",
    description:
      "Wolałem system asyst z CS:GO, ten niesmak przy 40'stce i łagodnie uśmiechnięta, bo 41 w 2 z emeczki się udało, coś wyjątkowego",
    performers: [
      getAchievementPlayer("EMUNIA", "5.73"),
      getAchievementPlayer("fy_pool_day enjoyer", "5.66"),
      getAchievementPlayer("vinicjusz", "5.4"),
    ],
  },
  {
    title: "Początek kariery",
    subtitle: "Najlepszy debiutant",
    description:
      "Wejście smoka, przyszedł i rozjebał, uważaj bo cię więcej nie zaprosimy",
    performers: [
      getAchievementPlayer("Hitari", "14gier"),
      getAchievementPlayer("Limek", "5gier"),
      getAchievementPlayer("Po Prostu Piotrek ;)", "4gry"),
    ],
  },
  {
    title: "Ćwiczenie czyni mistrza",
    subtitle: "Największy progres w stosunku do poprzedniego sezonu",
    description:
      "Bardzo mi miło, że na moich oczach doświadczacie postępu, szkoda że w gówno jebanej rozjebanej gierce",
    performers: [
      getAchievementPlayer("EMUNIA", "Winrate: +18pp"),
      getAchievementPlayer("Blazeoon", "Winrate: +15pp"),
      getAchievementPlayer("Cashotto", "Winrate: +10pp"),
    ],
  },
  {
    title: "Wstyd!",
    subtitle: "Największy zawód",
    description:
      "Nie przejmuj się, jutro też jest dzień, może nawet będzie lepszy",
    performers: [
      getAchievementPlayer("☢K0di☢", "Bo nie gra"),
      getAchievementPlayer("♣†Blady▲Miś†♣", "To samo ale mniej"),
      getAchievementPlayer("fy_pool_day enjoyer", "Bo nie obronił tytułu"),
    ],
  },

  {
    title: "Zmiany zmiany",
    subtitle: "Największa zmiana",
    description: "Zamienię cieeeee na lepszy moodel",
    performers: [
      getAchievementPlayer("Blazeoon", "Z grubej do chudej"),
      getAchievementPlayer("Arturek", "Znalazł babę"),
      getAchievementPlayer("Tomi", "Przefrabowałem włoski"),
    ],
  },
  {
    title: "Będzie ostro!",
    subtitle: "Najwięcej kos",
    description:
      "Informuję, że w następnym sezonie Wiśniewski będzie miał hattricka",
    performers: [
      getAchievementPlayer("Arturek", "5"),
      getAchievementPlayer("Cpt. Chicken", "4"),
      getAchievementPlayer("Hitari", "3"),
    ],
  },
  {
    title: "Paweł Adamowicz",
    subtitle: "Najwięcej kos - otrzymanych",
    description: "Jestem kurcze dumny z nazwy tego osiągnięcia",
    performers: [
      getAchievementPlayer("fy_pool_day enjoyer", "4"),
      getAchievementPlayer("VEGETAble", "3"),
      getAchievementPlayer("Tomi", "3"),
    ],
  },
  {
    title: "Ja pierdole w Józka szczelił pierun",
    subtitle: "Najwięcej zeusów",
    description: "Słabo, słabo w tym sezonie panowie",
    performers: [
      getAchievementPlayer("Cashotto", "1"),
      getAchievementPlayer("Arturek", "1"),
      getAchievementPlayer("?", "0"),
    ],
  },
  {
    title: "Holy Granade",
    subtitle: "Najwięcej killi z HE/Molotovów",
    description: "A tu se przerwę zrobię i nic nie napiszę. Taka se przerwa.",
    performers: [
      getAchievementPlayer("Hitari", "9"),
      getAchievementPlayer("Cashotto", "8"),
      getAchievementPlayer("fy_pool_day enjoyer", "6"),
    ],
  },
  {
    title: "Clutch or kick",
    subtitle: "Najwięcej ugranych clutchy 1v1 & 1v2",
    description: "Jaja ze stali",
    performers: [
      getAchievementPlayer("DeiDaRa", "11/14 + 4/12"),
      getAchievementPlayer("Cpt. Chicken", "12/17 + 5/30"),
      getAchievementPlayer("Cashotto", "7/10 + 4/10"),
    ],
  },
  {
    title: "Człowiek od zadań specjalnych",
    subtitle: "Najwięcej ugranych clutchy 1v3 & 1v4 & 1v5",
    description: "Runda w prezencie od przeciwnika, ale coś trzebało poklikać",
    performers: [
      getAchievementPlayer("DeiDaRa", "4/24 + 0/18 + 0/7"),
      getAchievementPlayer("Tomi", "2/21 + 1/25 + 0/15"),
      getAchievementPlayer("Cpt. Chicken", "2/30 + 0/34 + 0/13"),
    ],
  },
  {
    title: "Lee Sin",
    subtitle: "Najwięcej killi na flashu na mecz",
    description: "Czasami trzeba przyfarcić",
    performers: [
      getAchievementPlayer("777jajsko", "0.12"),
      getAchievementPlayer("Tomi", "0.08"),
      getAchievementPlayer("EMUNIA", "0.07"),
    ],
  },
  {
    title: "Skaner",
    subtitle: "Najwięcej killi przez ścianę na mecz",
    description: "Nie lubię takiego zachowania.",
    performers: [
      getAchievementPlayer("Hitari", "0.57"),
      getAchievementPlayer("fy_pool_day enjoyer", "0.54"),
      getAchievementPlayer("vinicjusz", "0.5"),
    ],
  },
  {
    title: "Papierosek",
    subtitle: "Najwięcej killi przez smoke'a na mecz",
    description:
      "To co trigger, wallhack, radar czy aimbot? Przyznajcie się panowie",
    performers: [
      getAchievementPlayer("Hitari", "1.71"),
      getAchievementPlayer("fy_pool_day enjoyer", "1"),
      getAchievementPlayer("Blazeoon", "0.92"),
    ],
  },
  {
    title: "Adam Małysz",
    subtitle: "Najwięcej killi w skoku na mecz",
    description:
      "Nwm jakim chujem Czarek nie wygrał, mam wrażenie, że 2 razy na mecz mnie z powietrza napierdala",
    performers: [
      getAchievementPlayer("Cashotto", "0.19"),
      getAchievementPlayer("Arturek", "0.13"),
      getAchievementPlayer("VEGETAble", "0.1"),
    ],
  },
  {
    title: "Najważniejsze zadanie",
    subtitle: "Najwięcej entry fragów na mecz",
    description: "No tutaj pozostaje mi pogratulować, zazdroszczę łobuzy",
    performers: [
      getAchievementPlayer("vinicjusz", "3.5"),
      getAchievementPlayer("DeiDaRa", "3.13"),
      getAchievementPlayer("fy_pool_day enjoyer", "3.03"),
    ],
  },
  {
    title: "Najlepszy gracz",
    subtitle: "Najlepsze entry K/D",
    description:
      "Serio kurwa, to powinna być metryka oceniania pro graczy, a nie jakieś losowe K/D",
    performers: [
      getAchievementPlayer("Cpt. Chicken", "1.65"),
      getAchievementPlayer("Hitari", "1.55"),
      getAchievementPlayer("vinicjusz", "1.52"),
    ],
  },
  {
    title: "And the winner is...",
    subtitle: "Najwięcej MVP na mecz",
    description: "MVP! MVP! MVP! MVP!",
    performers: [
      getAchievementPlayer("vinicjusz", "3.1"),
      getAchievementPlayer("Hitari", "3"),
      getAchievementPlayer("DeiDaRa", "2.92"),
    ],
  },
  {
    title: "Algorytm Wirkusa",
    subtitle: "Najwyższy Impact Factor",
    description:
      "Jeszcze raz niech mnie kurwa ktoś zapyta co to jest Impact Factor. Chociaż jak patrzę na rozbierzności, to na następny sezon trzeba zmienić parametry",
    performers: [
      getAchievementPlayer("Cpt. Chicken", "187"),
      getAchievementPlayer("fy_pool_day enjoyer", "182.01"),
      getAchievementPlayer("DeiDaRa", "164.03"),
    ],
  },
  {
    title: "Pistolet za darmo",
    subtitle: "Glock + USP na mecz",
    description: "Zapach 82 w 6 z uspa w jednego jak ci pięciu chłopa rushuje",
    performers: [
      getAchievementPlayer("vinicjusz", "1 + 1 = 2 xD"),
      getAchievementPlayer("Blazeoon", "0.73 + 1.08 = 1.81"),
      getAchievementPlayer("DeiDaRa", "0.84 + 0.96 = 1.8"),
    ],
  },
  {
    title: "Tani kałach",
    subtitle: "Mac10 + MP9",
    description: "Jebane kurwa op gówno sezon 2",
    performers: [
      getAchievementPlayer("Cashotto", "1.59 + 0.89 = 2.48"),
      getAchievementPlayer("777jajsko", "0.96 + 1.35 = 2.31"),
      getAchievementPlayer("Blazeoon", "0.46 + 1.15 = 1.61"),
    ],
  },
  {
    title: "Kalasznikow",
    subtitle: "Najwięcej killi z AK-47",
    description: "O, tutaj jak wygrałeś, to prawdopodobnie coś strzelasz",
    performers: [
      getAchievementPlayer("vinicjusz", "8.55"),
      getAchievementPlayer("fy_pool_day enjoyer", "7.81"),
      getAchievementPlayer("DeiDaRa", "7.72"),
    ],
  },
  {
    title: "Szczuplutka",
    subtitle: "Najwięcej killi z M4a1",
    description: "Ale bym taką rozkochał i pokłócił się o śmieci",
    performers: [
      getAchievementPlayer("Blazeoon", "4.15"),
      getAchievementPlayer("777jajsko", "4"),
      getAchievementPlayer("Tomi", "3.68"),
    ],
  },
  {
    title: "Tłuściutka",
    subtitle: "Najwięcej killi z M4a4",
    description: "Ale bym takiej nie poznał i uniknął rozmowy o feminitywach",
    performers: [
      getAchievementPlayer("Hitari", "2.07"),
      getAchievementPlayer("vinicjusz", "1.09"),
      getAchievementPlayer("VEGETAble", "1"),
    ],
  },
  {
    title: "Szczuplutka + Tłuściutka",
    subtitle: "Najwięcej killi z obu M4",
    description: "2:0 dla chudej, jak Mila z Niemcami w 88'",
    performers: [
      getAchievementPlayer("777jajsko", "4 + 0.42 = 4.42"),
      getAchievementPlayer("Blazeoon", "4.15 + 0 = 4.15"),
      getAchievementPlayer("fy_pool_day enjoyer", "3.39 + 0.75 = 4.14"),
    ],
  },
  {
    title: "Niby force, ale siły w tym nie ma",
    subtitle: "Famas + Galil",
    description: "Śmiech na sali, że to kosztuje 2 razy tyle co mac10",
    performers: [
      getAchievementPlayer("VEGETAble", "1.16 + 0.94 = 2.1"),
      getAchievementPlayer("vinicjusz", "0 + 1.8 = 1.8!"),
      getAchievementPlayer("Blazeoon", "0.42 + 1.12 = 1.54"),
    ],
  },
  {
    title: "Wróg u bram",
    subtitle: "AWP",
    description:
      "Jak Wiśniewski to wygrywa, to przestaję się martwić o wchodzenie pod awkę na dyszkach",
    performers: [
      getAchievementPlayer("Arturek", "3.27"),
      getAchievementPlayer("Cpt. Chicken", "2.5"),
      getAchievementPlayer("DeiDaRa", "2.12"),
    ],
  },
  {
    title: "Najgorsza broń w grze",
    subtitle: "Scout",
    description: "Kurwa czemu vini ma wszędzie 1 xD? Jebany system dziesiętny",
    performers: [
      getAchievementPlayer("vinicjusz", "1"),
      getAchievementPlayer("Hitari", "0.87"),
      getAchievementPlayer("VEGETAble", "0.81"),
    ],
  },
  {
    title: "Dziki zachód przed dodaniem rewolweru",
    subtitle: "Deagle",
    description: "<Bania w biegu z tego gówna przez pół mapy>",
    performers: [
      getAchievementPlayer("DeiDaRa", "0.96"),
      getAchievementPlayer("vinicjusz", "0.82"),
      getAchievementPlayer("fy_pool_day enjoyer", "0.5"),
    ],
  },
  {
    title: "Dobre, bo włoskie",
    subtitle: "De_Inferno",
    description:
      "Coraz gorzej kurwa idzie na tym inferno, ale co zrobić jak banan wpuszcza",
    performers: [
      getAchievementPlayer("Cashotto", "3/3"),
      getAchievementPlayer("Cpt. Chicken", "2/3"),
      getAchievementPlayer("fy_pool_day enjoyer", "2/3"),
    ],
  },
  {
    title: "Piaski czasu",
    subtitle: "De_Dust2",
    description:
      "Trzech na longa w pierwsze tempo i nic poza rushem b się nie da zrobić",
    performers: [
      getAchievementPlayer("Arturek", "2/3"),
      getAchievementPlayer("DeiDaRa", "2/3"),
      getAchievementPlayer("Blazeoon", "2/3"),
    ],
  },
  {
    title: "Na którym bsie paka?",
    subtitle: "De_Nuke",
    description:
      "Tutaj pełne uszanowanko dla twórców mapy, dla graczy, wspaniałe miejsce, wspaniałe zawody",
    performers: [
      getAchievementPlayer("Blazeoon", "5/6"),
      getAchievementPlayer("EMUNIA", "5/7"),
      getAchievementPlayer("fy_pool_day enjoyer", "5/7"),
    ],
  },
  {
    title: "Pociągi",
    subtitle: "De_Train",
    description: "Co zawór odjebał za chujowy glow up to nie mam siły",
    performers: [
      getAchievementPlayer("fy_pool_day enjoyer", "3/3"),
      getAchievementPlayer("EMUNIA", "2/3"),
      getAchievementPlayer("?", "Nikt inny nie zrobił 50% w 3 grach xD"),
    ],
  },
  {
    title: "Ściana na A",
    subtitle: "De_Mirage",
    description:
      "Nie wiem właśnie o co chodzi, że po terro A się nie da wejść, a po CT obronić",
    performers: [
      getAchievementPlayer("fy_pool_day enjoyer", "5/6"),
      getAchievementPlayer("Arturek", "4/6"),
      getAchievementPlayer("EMUNIA", "3/5"),
    ],
  },
  {
    title: "Starożytna, zielona",
    subtitle: "De_Ancient",
    description: "A idźcie mi kurwa z tą mapą",
    performers: [
      getAchievementPlayer("Hitari", "4/4"),
      getAchievementPlayer("VEGETAble", "5/7"),
      getAchievementPlayer("Blazeoon", "4/6"),
    ],
  },
  {
    title: "Ten z brzydko namalowaną głową psa",
    subtitle: "De_Anubis",
    description: "Wyblakła, tak bardzo się niczym nie wyróżnia",
    performers: [
      getAchievementPlayer("DeiDaRa", "3/3"),
      getAchievementPlayer("EMUNIA", "2/3"),
      getAchievementPlayer("Tomi", "2/3"),
    ],
  },
  {
    title: "Krzycz Miłosz s2",
    subtitle: "P90",
    description: "Kategoria dedykowana",
    performers: [
      getAchievementPlayer("Cashotto", "3.07"),
      getAchievementPlayer("Cashotto", "3.07"),
      getAchievementPlayer("Cashotto", "3.07"),
    ],
  },
  {
    title: "Se kurwa nowy negev znalazł",
    subtitle: "XM1014",
    description: "Kategoria dedykowana",
    performers: [
      getAchievementPlayer("Cpt. Chicken", "3.33"),
      getAchievementPlayer("Cpt. Chicken", "3.33"),
      getAchievementPlayer("Cpt. Chicken", "3.33"),
    ],
  },
  {
    title: "Normalnie bym nie dał, ale nwm jak z tego zabić",
    subtitle: "Revolver",
    description: "Kategoria dedykowana",
    performers: [
      getAchievementPlayer("Hitari", "0.27"),
      getAchievementPlayer("Hitari", "0.27"),
      getAchievementPlayer("Hitari", "0.27"),
    ],
  },
];
