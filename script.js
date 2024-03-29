console.log("let's validate this form")

const formElm = document.getElementById('main-form')
const emailInputElm = document.getElementById('email')
const countrySelectElm = document.getElementById('country')
const zipInputElm = document.getElementById('zip')
const passInputElm = document.getElementById('pass')
const confirmPassInputElm = document.getElementById('confirm-pass')

const emailErr = document.getElementById('email-err')
const countryErr = document.getElementById('country-err')
const zipErr = document.getElementById('zip-err')
const passErr = document.getElementById('pass-err')
const confirmPassErr = document.getElementById('confirm-pass-err')

const defaultZipPattern = '^([a-z0-9][a-z0-9- ]{0,10}[a-z0-9])$'
const zipPatterns = {
    GB: 'GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(d[dA-Z]?[ ]?d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?d{1,4}',
    JE: 'JEd[dA-Z]?[ ]?d[ABD-HJLN-UW-Z]{2}',
    GG: 'GYd[dA-Z]?[ ]?d[ABD-HJLN-UW-Z]{2}',
    IM: 'IMd[dA-Z]?[ ]?d[ABD-HJLN-UW-Z]{2}',
    US: 'd{5}([ -]d{4})?',
    CA: '[ABCEGHJKLMNPRSTVXY]d[ABCEGHJ-NPRSTV-Z][ ]?d[ABCEGHJ-NPRSTV-Z]d',
    DE: 'd{5}',
    JP: 'd{3}-d{4}',
    FR: 'd{2}[ ]?d{3}',
    AU: 'd{4}',
    IT: 'd{5}',
    CH: 'd{4}',
    AT: 'd{4}',
    ES: 'd{5}',
    NL: 'd{4}[ ]?[A-Z]{2}',
    BE: 'd{4}',
    DK: 'd{4}',
    SE: 'd{3}[ ]?d{2}',
    NO: 'd{4}',
    BR: 'd{5}[-]?d{3}',
    PT: 'd{4}([-]d{3})?',
    FI: 'd{5}',
    AX: '22d{3}',
    KR: 'd{3}[-]d{3}',
    CN: 'd{6}',
    TW: 'd{3}(d{2})?',
    SG: 'd{6}',
    DZ: 'd{5}',
    AD: 'ADd{3}',
    AR: '([A-HJ-NP-Z])?d{4}([A-Z]{3})?',
    AM: '(37)?d{4}',
    AZ: 'd{4}',
    BH: '((1[0-2]|[2-9])d{2})?',
    BD: 'd{4}',
    BB: '(BBd{5})?',
    BY: 'd{6}',
    BM: '[A-Z]{2}[ ]?[A-Z0-9]{2}',
    BA: 'd{5}',
    IO: 'BBND 1ZZ',
    BN: '[A-Z]{2}[ ]?d{4}',
    BG: 'd{4}',
    KH: 'd{5}',
    CV: 'd{4}',
    CL: 'd{7}',
    CR: 'd{4,5}|d{3}-d{4}',
    HR: 'd{5}',
    CY: 'd{4}',
    CZ: 'd{3}[ ]?d{2}',
    DO: 'd{5}',
    EC: '([A-Z]d{4}[A-Z]|(?:[A-Z]{2})?d{6})?',
    EG: 'd{5}',
    EE: 'd{5}',
    FO: 'd{3}',
    GE: 'd{4}',
    GR: 'd{3}[ ]?d{2}',
    GL: '39d{2}',
    GT: 'd{5}',
    HT: 'd{4}',
    HN: '(?:d{5})?',
    HU: 'd{4}',
    IS: 'd{3}',
    IN: 'd{6}',
    ID: 'd{5}',
    IL: 'd{5}',
    JO: 'd{5}',
    KZ: 'd{6}',
    KE: 'd{5}',
    KW: 'd{5}',
    LA: 'd{5}',
    LV: 'd{4}',
    LB: '(d{4}([ ]?d{4})?)?',
    LI: '(948[5-9])|(949[0-7])',
    LT: 'd{5}',
    LU: 'd{4}',
    MK: 'd{4}',
    MY: 'd{5}',
    MV: 'd{5}',
    MT: '[A-Z]{3}[ ]?d{2,4}',
    MU: '(d{3}[A-Z]{2}d{3})?',
    MX: 'd{5}',
    MD: 'd{4}',
    MC: '980d{2}',
    MA: 'd{5}',
    NP: 'd{5}',
    NZ: 'd{4}',
    NI: '((d{4}-)?d{3}-d{3}(-d{1})?)?',
    NG: '(d{6})?',
    OM: '(PC )?d{3}',
    PK: 'd{5}',
    PY: 'd{4}',
    PH: 'd{4}',
    PL: 'd{2}-d{3}',
    PR: '00[679]d{2}([ -]d{4})?',
    RO: 'd{6}',
    RU: 'd{6}',
    SM: '4789d',
    SA: 'd{5}',
    SN: 'd{5}',
    SK: 'd{3}[ ]?d{2}',
    SI: 'd{4}',
    ZA: 'd{4}',
    LK: 'd{5}',
    TJ: 'd{6}',
    TH: 'd{5}',
    TN: 'd{4}',
    TR: 'd{5}',
    TM: 'd{6}',
    UA: 'd{5}',
    UY: 'd{5}',
    UZ: 'd{6}',
    VA: '00120',
    VE: 'd{4}',
    ZM: 'd{5}',
    AS: '96799',
    CC: '6799',
    CK: 'd{4}',
    RS: 'd{6}',
    ME: '8d{4}',
    CS: 'd{5}',
    YU: 'd{5}',
    CX: '6798',
    ET: 'd{4}',
    FK: 'FIQQ 1ZZ',
    NF: '2899',
    FM: '(9694[1-4])([ -]d{4})?',
    GF: '9[78]3d{2}',
    GN: 'd{3}',
    GP: '9[78][01]d{2}',
    GS: 'SIQQ 1ZZ',
    GU: '969[123]d([ -]d{4})?',
    GW: 'd{4}',
    HM: 'd{4}',
    IQ: 'd{5}',
    KG: 'd{6}',
    LR: 'd{4}',
    LS: 'd{3}',
    MG: 'd{3}',
    MH: '969[67]d([ -]d{4})?',
    MN: 'd{6}',
    MP: '9695[012]([ -]d{4})?',
    MQ: '9[78]2d{2}',
    NC: '988d{2}',
    NE: 'd{4}',
    VI: '008(([0-4]d)|(5[01]))([ -]d{4})?',
    PF: '987d{2}',
    PG: 'd{3}',
    PM: '9[78]5d{2}',
    PN: 'PCRN 1ZZ',
    PW: '96940',
    RE: '9[78]4d{2}',
    SH: '(ASCN|STHL) 1ZZ',
    SJ: 'd{4}',
    SO: 'd{5}',
    SZ: '[HLMS]d{3}',
    TC: 'TKCA 1ZZ',
    WF: '986d{2}',
}

function setErr(message, element) {
    element.innerText = message
}

function genMessage(inputName, type) {
    switch (type) {
        case 'empty':
            return `${inputName} is required*`
        case 'mismatch':
            return `${inputName} is expected here.`
        default:
            return ''
    }
}

function validateZipPattern() {
    if (!zipInputElm.checkValidity()) return
    const alphaCode = countrySelectElm.value
    const zip = zipInputElm.value
    let message = ''
    let constraint
    if (alphaCode === '0' || !(alphaCode in zipPatterns))
        constraint = new RegExp(defaultZipPattern, '')
    else constraint = new RegExp(zipPatterns[alphaCode], '')

    if (!constraint.test(zip))
        message = 'Zip Code does not comply with the selected country.'
    else message = ''

    setErr(message, zipErr)
    zipInputElm.setCustomValidity(message)
}

function validateCountry() {
    const value = countrySelectElm.value
    let message = ''
    if (value != '0') {
        message = ''
    } else {
        message = `Please select a country.`
    }
    setErr(message, countryErr)
    countrySelectElm.setCustomValidity(message)
}

function validatePass() {
    if (!passInputElm.checkValidity()) return
    const value = passInputElm.value
    const minLength = 8
    let message = ''
    if (value.length >= minLength) {
        message = ''
    } else {
        message = `Password must be atleast ${minLength} characters long`
    }
    setErr(message, passErr)
    passInputElm.setCustomValidity(message)
}

function matchPass() {
    const value = passInputElm.value
    const cvalue = confirmPassInputElm.value
    let message = ''
    if (value === cvalue) {
        message = ''
    } else {
        message = 'Passwords do not match'
    }
    setErr(message, confirmPassErr)
    confirmPassInputElm.setCustomValidity(message)
}

function validate(inputName, inputElm, errElm) {
    const value = inputElm.value

    let message = ''
    if (!value) {
        message = genMessage(inputName, 'empty')
        setErr(message, errElm)
        inputElm.setCustomValidity(message)
    } else if (inputElm.validity.typeMismatch) {
        message = genMessage(inputName, 'mismatch')
        setErr(message, errElm)
        emailInputElm.setCustomValidity(message)
    } else {
        setErr('', errElm)
        inputElm.setCustomValidity('')
    }
}

emailInputElm.addEventListener('focusout', () =>
    validate('Email', emailInputElm, emailErr),
)

countrySelectElm.addEventListener('focusout', () => validateCountry())
countrySelectElm.addEventListener('change', validateZipPattern)

zipInputElm.addEventListener('focusout', () => {
    validate('Zip Code', zipInputElm, zipErr)
    validateZipPattern()
})

passInputElm.addEventListener('focusout', () => {
    validate('Password', passInputElm, passErr)
    validatePass()
})

confirmPassInputElm.addEventListener('focusout', () => {
    validate('Confirm Password', confirmPassInputElm, confirmPassErr)
    matchPass()
})

formElm.addEventListener('submit', (e) => {
    e.preventDefault()
})
