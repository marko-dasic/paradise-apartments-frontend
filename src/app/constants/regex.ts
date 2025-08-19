export const REGEX = {
    NAME :/^(?:[A-ZŽĆČŠĐ][a-zžćčšđ]*)(?:\s[A-ZŽŠĐĆČ][a-zžčćšđ]*)?(?:\s[A-ZŽŠĐČĆ][a-zzđšćč]*)?$/,
    PHONE :/^(\+\d{1,4}\s?)?(\d{2,3}\s?)?\d{3}\s?\d{3,4}$/,
    PASSWORD :/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    OPTIONALPASSWORD:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$|^$/
 
}