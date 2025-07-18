import { ImageGallery } from "@/components/ImageGallery";
import { Podium } from "@/components/Podium";
import { season1Achievements } from "./achievements";

const season1Images = [
  "/seasons/season2/general.png",
  "/seasons/season2/general_advanced.png",
  "/seasons/season2/kda.png",
  "/seasons/season2/adr.png",
  "/seasons/season2/hs.png",
  "/seasons/season2/general_2.png",
  "/seasons/season2/advanced_1.png",
  "/seasons/season2/advanced_2.png",
  "/seasons/season2/special_weapons.png",
  "/seasons/season2/pistols_total.png",
  "/seasons/season2/main_weapons_total.png",
  "/seasons/season2/other_weapons_total.png",
  "/seasons/season2/pistols_avg.png",
  "/seasons/season2/main_weapons_avg.png",
  "/seasons/season2/other_weapons_avg.png",
  "/seasons/season2/maps_1.png",
  "/seasons/season2/maps_2.png",
];
export default async function HistorySeason2Page() {
  return (
    <div className="flex flex-col gap-4 items-center mt-6 text-lg">
      <div className="text-center">
        <h2 className="text-2xl">Witamy na podsumowaniu sezonu 2.</h2>
        <span>
          Był to długi sezon, były emocje np. rozczarowanie, gdy Miłosz
          dwukrotnie wyjebał csa z kompa i praktycznie załatwił nas na miesiące
          bez grania, ale była też radość, gdy po odjebanej gierce mogłem się
          wreszcie położyć spać, nie trzeba dalej grać; a nawet nie można, bo
          sezon się skończył
        </span>
        <br />
        <span className="font-bold">Powodzenia w następnym!</span>
        <div className="mb-8 mt-6">
          Wiadomo, tak jak ostatnio sezon, zostaje zapamiętany na fotografiach,
          może i nie da się fajnie przeklikiwać, ale tak było łatwiej to
          stworzyć by się apka nie spasła jak twoja mat WRÓĆ
        </div>
      </div>
      <ImageGallery images={season1Images} />
      <div className="mb-8 mt-6">A teraz czas na wyróżnienia:</div>
      <div className="flex gap-4 flex-wrap items-center justify-center text-sm">
        {season1Achievements.map((achievement) => (
          <Podium key={achievement.title} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}
