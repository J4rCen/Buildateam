export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    },
    moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "babel-jest",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "babel-jest"
    }
}