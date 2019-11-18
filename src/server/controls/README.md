# Controls

This dir houses the business logic for the backend. Each route will have a control, and within a control you can call other controls. Each control file will ideally have one exported function of the same name as the file.

The motivation is to decouple our routes from our business logic so that the business logic and can be used elsewhere (e.g. in unit tests).
