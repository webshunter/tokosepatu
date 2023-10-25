export function formatRupiah(number) {
    if (isNaN(number)) {
        return "Invalid number";
    }

    const rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    return rupiah.format(number);
}