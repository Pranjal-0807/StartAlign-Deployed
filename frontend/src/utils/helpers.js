export const formatDate = (isoString) => {
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setUTCDate(today.getUTCDate() - 1);

    // Convert all dates to UTC for comparison
    const dateUTC = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );
    const todayUTC = new Date(
        Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );
    const yesterdayUTC = new Date(
        Date.UTC(
            yesterday.getUTCFullYear(),
            yesterday.getUTCMonth(),
            yesterday.getUTCDate()
        )
    );

    if (dateUTC.getTime() === todayUTC.getTime()) return "Today";
    if (dateUTC.getTime() === yesterdayUTC.getTime()) return "Yesterday";

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }); // Example: "25 Feb 2025"
};


// 📌 Format time to "HH:MM AM/PM"
export const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

// const formatDate = (isoString) => {
//     return new Date(isoString).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//     });
// };

// const formatTime = (isoString) => {
//     return new Date(isoString).toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//     });
// };

// console.log(formatDate("2021-09-01T10:00:00Z")); // "1 Sep 2021"
// console.log(formatTime("2021-09-01T10:00:00Z")); // "10:00 AM"