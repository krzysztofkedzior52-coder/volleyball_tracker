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
//       apiKey: "AIzaSyCL-z5vL3c1cExa3S9QK5cwK2LkNr9fpyA",
//       authDomain: "volleyball-tracker-3720d.firebaseapp.com",
//       projectId: "volleyball-tracker-3720d",
//       appId: "1:96419973783:web:4acca77bfe460257ecf7d2"
//     }
//   };
//
// (These values are safe to publish; access is controlled by firestore.rules + the team password.)
window.VBS_CONFIG = { firebase: null };
