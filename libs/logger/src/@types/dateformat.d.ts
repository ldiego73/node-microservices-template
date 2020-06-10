declare module "dateformat" {
  interface _dateformat {
    /**
     * Returns a string representing date using format mask.
     *
     * @param {Date} date The date
     * @param {string} mask The format mask
     */
    (date: Date, mask: string): string;
    /**
     * Returns a string representing date using the default
     * format mask.
     *
     * @param {Date} date The date
     */
    (date: Date): string;
    /**
     * Returns a string representing the current date (now)
     * using format mask.
     *
     * @param {string} mask The format mask
     */
    (mask: string): string;

    readonly masks: {
      default: string;
      shortDate: string;
      mediumDate: string;
      longDate: string;
      fullDate: string;
      shortTime: string;
      mediumTime: string;
      longTime: string;
      isoDate: string;
      isoTime: string;
      isoDateTime: string;
      isoUtcDateTime: string;
      expiresHeaderFormat: string;
    };

    i18n: {
      dateNames: string[];
      monthNames: string[];
    };
  }
  let dateformat: _dateformat;
  export default dateformat;
}
