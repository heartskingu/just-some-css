function activateSideMenu() {
    console.log(document.documentElement.style.getPropertyValue('--side-menu-width'))
    if (!document.documentElement.style.getPropertyValue('--side-menu-width') || document.documentElement.style.getPropertyValue('--side-menu-width') === '0') {
        document.documentElement.style.setProperty('--side-menu-width', '30');
        document.documentElement.style.setProperty('--container-margin', '0');
    } else {
        document.documentElement.style.setProperty('--side-menu-width', '0');
        document.documentElement.style.setProperty('--container-margin', '0 auto');
    }

}