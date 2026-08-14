# Expo Platform Provenance

Use current official Expo documentation to refresh platform claims before changing guidance. The target repository's installed versions and ownership rules remain authoritative for that project.

## Inspect The Target Repository

- `package.json`: installed Expo, React Native, React, navigation, animation, development-client, TaskManager, notification, location, and update versions.
- app config: permissions, background modes, config plugins, update URL and runtime policy, and iOS or Android configuration.
- runtime entry and Babel configuration: global task definitions and animation or worklet transform ownership.
- background, location, and notification services: registration, permission, ownership, cleanup, and delivery behavior.
- `ios/` and `android/`, when present: generated or checked-in native state and manual extensions.

## Official Primary Sources

- [Expo SDK changelog](https://expo.dev/changelog): SDK-to-React-Native compatibility and migration boundaries.
- [Expo app configuration](https://docs.expo.dev/workflow/configuration/): configuration consumers and runtime access.
- [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/): custom native libraries and configuration.
- [Expo CLI](https://docs.expo.dev/more/expo-cli/): dependency validation and compatibility tooling.
- [Expo config plugins](https://docs.expo.dev/config-plugins/introduction/): prebuild-time native configuration.
- [Expo TaskManager](https://docs.expo.dev/versions/latest/sdk/task-manager/): task definition and platform availability.
- [Expo notifications](https://docs.expo.dev/push-notifications/what-you-need-to-know/): local, remote, foreground, background, and terminated delivery boundaries.
- [Expo New Architecture](https://docs.expo.dev/guides/new-architecture/): current support and migration guidance.
- [Expo updates](https://docs.expo.dev/versions/latest/sdk/updates/) and [runtime versions](https://docs.expo.dev/eas-update/runtime-versions/): update selection and native-runtime compatibility.

Do not turn documentation examples into authority to install dependencies, regenerate native projects, build, upload, deploy, or change credentials. Those are separate task decisions.
