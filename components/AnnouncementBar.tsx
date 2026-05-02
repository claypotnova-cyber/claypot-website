/**
 * AnnouncementBar — full-width CSS marquee, no JS animation.
 * Scroll direction: right → left, infinite, seamless.
 * Pause on hover (desktop). Mobile-safe.
 */

const TEXT =
  "Diet kal se… aaj full Mandi! 🍛  •  Aakali level dangerous? Claypot ki randi! 🔥  •  Warning: You may fall in love with our Biryani! ❤️  •  Pet bhookha? Logic bandh… order start! 😋  •  Okasari try chesthe… gym cancel aipothundi! 💪❌  •  Family vachinda? Big Mandi ready! 👨‍👩‍👧‍👦  •  Swad aisa… plate bhi shock! 🤯  •  Hungry + Friends = Claypot entry! 🎉  •  Mandi khaya? Tension gaya! 😌  •  Biryani lovers… welcome home! 🏡  •  Aaj cheat day… kal sochenge! 😄  •  Don't just eat. Experience the Claypot Legend. 🏆  •  The Mandi platter that broke the internet — come get yours! 📸  •  Your boss called... he said take a Mandi break! 🤫🍛  •  Serving the boldest flavors in Northern Virginia. Period. 📍  •  One bite and you're part of the Claypot Family. ❤️  •  Stop scrolling, start eating! Fresh batches ready now. 🚀  •  Gym closed? No, but our Mandi is OPEN! 🏋️‍♂️❌🍛✅  •  ";

export default function AnnouncementBar() {
  return (
    <>
      <div
        className="top-announcement-bar shadow-lg"
        aria-label="Announcement"
        role="marquee"
      >
        <div className="announcement-track">
          <span className="announcement-content">
            {TEXT}
          </span>
          <span className="announcement-content" aria-hidden="true">
            {TEXT}
          </span>
          <span className="announcement-content" aria-hidden="true">
            {TEXT}
          </span>
          <span className="announcement-content" aria-hidden="true">
            {TEXT}
          </span>
        </div>
      </div>

      {/* Spacer to push content below the fixed bars (AnnouncementBar + PromoBar) */}
      <div 
        style={{ height: "calc(var(--ann-bar-h) + var(--promo-bar-h))" }} 
        className="bg-cream"
        aria-hidden="true" 
      />
    </>
  );
}
