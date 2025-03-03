import { ImageGallery } from "@/components/ImageGallery";
import { Podium } from "@/components/Podium";
import { season1Achievements } from "./achievements";

const season1Images = [
  "/seasons/season1_general.png",
  "/seasons/season1_kda.png",
  "/seasons/season1_adr.png",
  "/seasons/season1_hs.png",
  "/seasons/season1_knife.png",
  "/seasons/season1_zeus.png",
  "/seasons/season1_ak47.png",
  "/seasons/season1_m4.png",
  "/seasons/season1_awp.png",
  "/seasons/season1_mac10.png",
  "/seasons/season1_mp9.png",
  "/seasons/season1_pistols.png",
];
export default async function HistorySeason1Page() {
  return (
    <div className="flex flex-col gap-4 items-center mt-6 text-lg">
      <div className="text-center">
        <h2 className="text-2xl">Witamy na podsumowaniu sezonu 1.</h2>
        <span>
          Zapraszamy na wyprawę w przeszłość pełną kałachów, clutchów i
          niespełnionych miłości...
        </span>
        <div className="mb-8 mt-6">
          Oto kilka statystyk z pierwszego sezonu przedstawionych na screenach:
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
