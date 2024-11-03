import { html } from 'satori-html'
import backgroundBase64 from './base64'
import type { BgType } from '../../src/types'

export const ogImageMarkup = (
  authorOrBrand: string,
  title: string,
  bgType: BgType
) => {
  if (!['plum', 'dot', 'rose', 'particle'].includes(bgType))
    throw new Error(
      "The value of 'bgType' must be one of the following: 'plum', 'dot', 'rose', 'particle'."
    )

  return html`<div
    tw="relative flex justify-center items-center w-full h-full"
    style="font-family: 'Inter'"
  >
    <img
      tw="absolute inset-0 w-full h-full"
      src=${backgroundBase64[bgType]}
      alt="open graph"
    />

    <div tw="flex items-center justify-start w-full px-18" style="gap: 20px">
      <div tw="self-start flex justify-center items-center">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="192" height="192">
<path d="M0 0 C63.36 0 126.72 0 192 0 C192 63.36 192 126.72 192 192 C128.64 192 65.28 192 0 192 C0 128.64 0 65.28 0 0 Z " fill="#040404" transform="translate(0,0)"/>
<path d="M0 0 C1.90415587 0.13845167 3.80788807 0.28273747 5.71142578 0.42944336 C6.77160919 0.50915878 7.8317926 0.58887421 8.92410278 0.67100525 C13.12201634 1.12000969 16.90500693 2.16761299 20.875 3.5625 C22.01980835 3.95731567 22.01980835 3.95731567 23.18774414 4.36010742 C46.79790787 12.86745328 63.68328583 30.01535171 74.75 52.25 C82.23480682 69.90906965 84.50176265 91.7233916 78 110 C77.59007812 111.25039062 77.18015625 112.50078125 76.7578125 113.7890625 C73.39310944 123.80344528 73.39310944 123.80344528 71 125 C68.79882813 123.97460938 68.79882813 123.97460938 66.03125 122.34375 C64.99814697 121.74079102 63.96504395 121.13783203 62.90063477 120.51660156 C61.77842529 119.85112305 60.65621582 119.18564453 59.5 118.5 C58.32984012 117.81393467 57.15917808 117.12872517 55.98803711 116.44433594 C53.54589489 115.01632525 51.10598458 113.58460422 48.66748047 112.15039062 C42.98685416 108.81385502 37.27292001 105.53521151 31.5625 102.25 C28.53820655 100.50674785 25.53437867 98.76848197 22.58178711 96.90551758 C19.80655242 95.26856254 17.13493196 94.43828816 14.02954102 93.6003418 C8.03396269 91.65266803 3.39105229 89.51417462 0 84 C-3.70958068 71.60554014 -1.85539877 57.03905464 -1.30462646 44.30548096 C-1.10923591 39.31258538 -1.02327648 34.31789269 -0.92773438 29.32226562 C-0.72475272 19.54339301 -0.40111842 9.77261193 0 0 Z " fill="#FAFAFA" transform="translate(102,10)"/>
<path d="M0 0 C1.93527142 0.95454667 3.8329214 1.98709091 5.69921875 3.0703125 C6.81345215 3.71226563 7.92768555 4.35421875 9.07568359 5.015625 C10.27969103 5.71863246 11.48362811 6.42176044 12.6875 7.125 C13.93532775 7.84701457 15.1835432 8.56835946 16.43212891 9.2890625 C19.01113886 10.77914065 21.58781978 12.27312899 24.16259766 13.77050781 C27.81577158 15.89454528 31.47505018 18.00783492 35.13671875 20.1171875 C39.51445834 22.63944887 43.89088846 25.1639398 48.265625 27.69140625 C54.83143258 31.48260974 61.41056861 35.2500145 68 39 C66.37183116 48.85946687 55.10534468 57.32882848 47.44140625 62.83984375 C33.85713482 71.85002088 18.44168571 78.51393474 2 79 C1.34999023 79.02046387 0.69998047 79.04092773 0.03027344 79.06201172 C-2.12572414 79.12176337 -4.28086952 79.15929286 -6.4375 79.1875 C-7.46774292 79.20731934 -7.46774292 79.20731934 -8.51879883 79.22753906 C-12.18867399 79.23297659 -14.88231309 79.01732682 -18 77 C-14.30046428 74.68932652 -10.58702416 72.40339404 -6.85986328 70.13769531 C-5.11599613 69.07095589 -3.38371425 67.9853422 -1.65234375 66.8984375 C5.55478834 62.53201127 12.53463456 59.64794925 20.57958984 57.15234375 C28.74091566 54.57118562 35.51700015 50.61859987 42 45 C40.58531689 44.03874097 39.1681636 43.08111675 37.75 42.125 C36.96109375 41.59132812 36.1721875 41.05765625 35.359375 40.5078125 C34.58078125 40.01023438 33.8021875 39.51265625 33 39 C32.36578125 38.58492187 31.7315625 38.16984375 31.078125 37.7421875 C27.29843179 36.39229707 23.87255166 37.58843417 20.34472656 39.25244141 C19.45237305 39.78015137 18.56001953 40.30786133 17.640625 40.8515625 C16.61936523 41.44864014 15.59810547 42.04571777 14.54589844 42.66088867 C13.45825195 43.30904541 12.37060547 43.95720215 11.25 44.625 C9.52129334 45.63989508 7.79257691 46.65477394 6.06329346 47.66868591 C4.26071489 48.72689899 2.46043082 49.78894728 0.66015625 50.85107422 C-2.97268808 52.98960437 -6.62406038 55.09484533 -10.28125 57.19140625 C-10.86932434 57.52879822 -11.45739868 57.86619019 -12.06329346 58.21380615 C-14.89016761 59.83526183 -17.71781246 61.45536595 -20.54589844 63.07470703 C-21.5671582 63.6623584 -22.58841797 64.25000977 -23.640625 64.85546875 C-25.05891602 65.67023682 -25.05891602 65.67023682 -26.50585938 66.50146484 C-28.574506 67.74435374 -30.48814671 69.05149902 -32.421875 70.48828125 C-35 72 -35 72 -37.44921875 71.97265625 C-40.73972205 70.71793141 -43.73408714 69.14772937 -46.8125 67.4375 C-47.40998047 67.10814453 -48.00746094 66.77878906 -48.62304688 66.43945312 C-50.08533998 65.63226733 -51.5431399 64.81695083 -53 64 C-53 63.34 -53 62.68 -53 62 C-52.00709961 61.42838135 -52.00709961 61.42838135 -50.99414062 60.84521484 C-35.9097626 52.15846102 -20.84927798 43.43251826 -5.82128906 34.6484375 C-0.88251631 31.76278557 4.05882765 28.88154051 9 26 C2.90281221 20.92094109 2.90281221 20.92094109 -4.39379883 19.21240234 C-7.31519422 20.09525214 -9.63032646 21.30451829 -12.26171875 22.8515625 C-13.28628174 23.4487207 -14.31084473 24.04587891 -15.36645508 24.66113281 C-16.4623999 25.30920898 -17.55834473 25.95728516 -18.6875 26.625 C-20.42193149 27.63875188 -22.15637001 28.65249198 -23.89122009 29.66552734 C-25.70179996 30.72386287 -27.5106191 31.78516397 -29.31933594 32.84667969 C-35.29665423 36.34969392 -41.30715075 39.79535795 -47.3125 43.25 C-49.4547879 44.48374869 -51.59674019 45.7180804 -53.73828125 46.953125 C-54.63587158 47.47036133 -55.53346191 47.98759766 -56.45825195 48.52050781 C-58.22779973 49.55052026 -59.97423815 50.62084235 -61.70092773 51.72119141 C-64 53 -64 53 -66.046875 52.5078125 C-68.55860266 50.56875875 -70.31636891 48.38872042 -72.25 45.875 C-72.95640625 44.96492188 -73.6628125 44.05484375 -74.390625 43.1171875 C-74.92171875 42.41851562 -75.4528125 41.71984375 -76 41 C-73.73786526 38.52509694 -71.44745997 36.97504144 -68.51953125 35.35546875 C-67.61509277 34.85072021 -66.7106543 34.34597168 -65.77880859 33.82592773 C-64.79992676 33.28524658 -63.82104492 32.74456543 -62.8125 32.1875 C-60.7166349 31.01707968 -58.62160856 29.84515636 -56.52734375 28.671875 C-55.44694824 28.06666016 -54.36655273 27.46144531 -53.25341797 26.83789062 C-48.09598699 23.92440268 -42.98552259 20.93225956 -37.875 17.9375 C-35.88671958 16.7786444 -33.89843834 15.61979023 -31.91015625 14.4609375 C-27.92497865 12.13454806 -23.95681228 9.78182004 -19.99609375 7.4140625 C-18.1017477 6.296561 -16.20722416 5.1793603 -14.3125 4.0625 C-13.44544434 3.5358374 -12.57838867 3.0091748 -11.68505859 2.46655273 C-10.47390381 1.75801147 -10.47390381 1.75801147 -9.23828125 1.03515625 C-8.53743408 0.6162915 -7.83658691 0.19742676 -7.11450195 -0.23413086 C-4.29035904 -1.25703079 -2.85338359 -0.90193159 0 0 Z " fill="#F8F8F8" transform="translate(100,104)"/>
<path d="M0 0 C0 5.61 0 11.22 0 17 C-1.753125 17.2475 -3.50625 17.495 -5.3125 17.75 C-22.38137114 20.63487963 -38.64342889 29.29064383 -49.25 43.1875 C-58.80031145 57.189394 -63.5413701 70.1755295 -63.1875 87.125 C-63.17396484 88.36765625 -63.16042969 89.6103125 -63.14648438 90.890625 C-63.11144295 93.92754831 -63.06231433 96.96353467 -63 100 C-61.67666927 99.28983354 -60.35387535 98.57866681 -59.03125 97.8671875 C-57.72546997 97.16722656 -57.72546997 97.16722656 -56.39331055 96.453125 C-54.43433656 95.38462379 -52.48801535 94.29264967 -50.55395508 93.1796875 C-45.20098777 90.12401579 -40.08292859 87.59122319 -34.23046875 85.6328125 C-27.19635292 82.97534177 -21.12168251 80.56914643 -17 74 C-13.04251893 60.15704957 -14.92703383 44.16786577 -16 30 C-9.75306537 27.3227423 -7.41020486 27 0 27 C0 45.81 0 64.62 0 84 C-3.75375 86.165625 -7.5075 88.33125 -11.375 90.5625 C-12.64142334 91.29315674 -13.90784668 92.02381348 -15.21264648 92.77661133 C-21.09072596 96.1679265 -26.96897393 99.55894867 -32.84765625 102.94921875 C-33.94352051 103.58142334 -35.03938477 104.21362793 -36.16845703 104.86499023 C-38.3394206 106.11682069 -40.51096601 107.36764266 -42.68310547 108.61743164 C-47.73342162 111.52548243 -52.77264191 114.44906643 -57.78515625 117.421875 C-58.67082275 117.94426758 -59.55648926 118.46666016 -60.46899414 119.00488281 C-62.11409578 119.97667817 -63.75544884 120.95485745 -65.39233398 121.94042969 C-67.22703933 123.02114936 -69.10940664 124.02032889 -71 125 C-74.68713742 123.15643129 -75.26936249 118.28726927 -76.5625 114.5625 C-76.87896484 113.69689453 -77.19542969 112.83128906 -77.52148438 111.93945312 C-84.74901924 91.33100447 -81.66179855 67.57086663 -72.65625 48.09375 C-61.31009199 26.15784451 -43.09546505 10.9365057 -19.921875 2.9375 C-13.37412547 1.03536047 -6.81993112 0 0 0 Z " fill="#F9F9F9" transform="translate(91,10)"/>
<path d="M0 0 C1.44015163 0.47224628 2.87964063 0.9465136 4.31884766 1.42163086 C5.12053375 1.68552109 5.92221985 1.94941132 6.74819946 2.22129822 C22.68286538 7.73171201 33.8138117 20.43182787 41.5625 34.921875 C42.83283577 37.59865394 43.98181048 40.21670092 45 43 C45.26111572 43.67998047 45.52223145 44.35996094 45.79125977 45.06054688 C48.35135639 52.42976881 48.34906319 59.38653728 48.1875 67.125 C48.16719727 68.98898438 48.16719727 68.98898438 48.14648438 70.890625 C48.11144295 73.92754831 48.06231433 76.96353467 48 80 C47.01 80.495 47.01 80.495 46 81 C43.70361328 79.92700195 43.70361328 79.92700195 40.8203125 78.23828125 C39.74394531 77.61244141 38.66757813 76.98660156 37.55859375 76.34179688 C36.42550781 75.67212891 35.29242188 75.00246094 34.125 74.3125 C33.06152344 73.69310547 31.99804688 73.07371094 30.90234375 72.43554688 C29.21015786 71.44661995 27.51840774 70.45590266 25.85546875 69.41854858 C22.23286509 67.18168149 18.64027616 65.39849888 14.69921875 63.77783203 C9.11676931 61.29737064 3.88956714 58.84636293 0 54 C-3.1934714 45.20141084 -1.87773429 35.40307657 -1.25 26.25 C-1.14956451 23.70347442 -1.05832911 21.15656837 -0.9765625 18.609375 C-0.75721935 12.39788677 -0.42375909 6.20071977 0 0 Z " fill="#050505" transform="translate(118,30)"/>
</svg>
      </div>

      <div tw="flex flex-col" style="gap: 10px">
        <div tw="text-[#858585] text-2.1rem">${authorOrBrand}</div>
        <div tw="text-white text-3.1rem leading-relaxed mr-18">${title}</div>
      </div>
    </div>
  </div>`
}
