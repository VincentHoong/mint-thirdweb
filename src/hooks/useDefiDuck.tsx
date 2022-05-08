export const shortenAddress = (address: string | undefined) => {
    if (address) {
        const length = address.length - 1;
        return address.substring(0, 5) + "..." + address.substring(length - 4, length);
    } else {
        return "";
    }
}
