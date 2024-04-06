class StringFormatUtils {
    static formatPrice(price) {
        return `$${Number(price).toFixed(2)}`;
    }
}

export default StringFormatUtils;
