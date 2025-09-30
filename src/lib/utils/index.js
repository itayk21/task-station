export const validateManagerAccess = (role) => {
    return role === 'manager' || role === 'admin';
}

export const validateAdminAccess = (role) => {
    return role === 'admin';
}

