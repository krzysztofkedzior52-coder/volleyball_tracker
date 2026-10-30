// Volleyball Stat Tracker — configuration
//
// Leave `firebase` as null to run in SINGLE-DEVICE mode: stats are encrypted with your team
// password and stored in this browser only (nothing is shared between phones).
//
// To share live stats between coaches/devices, create a free Firebase project (see README.md,
// "Step 2") and paste its web-app config here, e.g.
//
//   window.VBS_CONFIG = {
//     firebase: {
//       apiKey: "AIza...",
//       authDomain: "your-project.firebaseapp.com",
//       projectId: "your-project",
//       appId: "1:123456789:web:abcdef"
//     }
//   };
//
// (These values are safe to publish; access is controlled by firestore.rules + the team password.)
window.VBS_CONFIG = { firebase: null };
