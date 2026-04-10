/**
 * AnnouncementBar — full-width CSS marquee, no JS animation.
 * Scroll direction: right → left, infinite, seamless.
 * Pause on hover (desktop). Mobile-safe.
 */

const TEXT =
  "Diet kal se… aaj full Mandi! 🍛  •  Aakali level dangerous? Claypot ki randi! 🔥  •  Warning: You may fall in love with our Biryani! ❤️  •  Pet bhookha? Logic bandh… order start! 😋  •  Okasari try chesthe… gym cancel aipothundi! 💪❌  •  Family vachinda? Big Mandi ready! 👨‍👩‍👧‍👦  •  Swad aisa… plate bhi shock! 🤯  •  Hungry + Friends = Claypot entry! 🎉  •  Mandi khaya? Tension gaya! 😌  •  Biryani lovers… welcome home! 🏡  •  Aaj cheat day… kal sochenge! 😄  •  ";

export default function AnnouncementBar() {
  return (
    <>
      {/*
        Fixed bar — sits above everything at z-index 1100.
        A matching spacer div below compensates for layout shift.
      */}
      <div
        className="top-announcement-bar"
        aria-label="Announcement"
        role="marquee"
      >
        {/* Track is 200% wide; animation moves it -50% → one seamless loop */}
        <div className="announcement-track">
          {/* Two identical copies create the illusion of infinite scroll */}
          <span className="announcement-content" aria-hidden="true">
            {TEXT}
          </span>
          <span className="announcement-content">
            {TEXT}
          </span>
        </div>
      </div>

      {/* Spacer — covers announcement bar (--ann-bar-h) + PromoBar (40px), both now fixed */}
      <div style={{ height: "calc(var(--ann-bar-h) + 40px)" }} aria-hidden="true" />
    </>
  );
}
