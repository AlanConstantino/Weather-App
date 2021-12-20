export function sanitizeQuery(query) {
    // convert query to lowercase and uppercase strings
    const lower = query.toLowerCase();
    const upper = query.toUpperCase();
    
    // compare the lowercase letters and uppercase letters
    // if they equate to each other (notice the != instead of
    // the !== symbol) then you add them to the result if the
    // current character also happens to be a number, add that
    // to the result as well
    let res = "";
    for(let i = 0; i < lower.length; ++i) {
        if(lower[i] != upper[i] || lower[i].trim() === '' || !isNaN(lower[i])) {
            res += query[i];
        }
    }

    // trims whitespace and replaces multiple spaces with a single space
    const multipleSpaces = res.trim().replaceAll(/\s\s+/g, ' ');
    // replaces singular spaces with a ',' character
    const sanitized = multipleSpaces.replaceAll(' ', ',');

    return sanitized;
}