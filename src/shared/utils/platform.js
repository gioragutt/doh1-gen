const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

const isMobile = () => mobileRegex.test(navigator.userAgent)

export default isMobile
