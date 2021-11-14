## Install

```
npm install
```

## Run server
```angular2html
ng serve
```

## Tree

```
│   favicon.ico
│   index.html
│   main.ts
│   polyfills.ts
│   styles.css
│   test.ts
│
├───app
│   │   AbstractChartGenerator.ts - klasa po której dziedziczą chart generatory różnych typów
│   │   app-routing.module.ts - zawiera routes
│   │   app.component.css
│   │   app.component.html
│   │   app.component.spec.ts
│   │   app.component.ts
│   │   app.module.ts
│   │   cached-data-download-synchronizer.service.spec.ts
│   │   cached-data-download-synchronizer.service.ts - automatycznie pobiera dane usera potrzebne do autoryzacji
│   │   charts.service.spec.ts
│   │   charts.service.ts - tworzy wykresy używając generatorów
│   │   ColorsGenerator.ts - modyfikuje EChartOptions dodając kolory
│   │   commonAnimations.ts - animacje angularowe
│   │   Configuration.ts - adresy IP
│   │   dashboard-modals.service.spec.ts
│   │   dashboard-modals.service.ts - funkcje otwierające i obsługujące modale i dialogi
│   │   dashboard.service.spec.ts
│   │   dashboard.service.ts - zawiera definicje endpointów do pobierania danych na dashboard
│   │   filter-by-name.pipe.spec.ts
│   │   filter-by-name.pipe.ts - różnego rodzaju pipes do filtrowania danych w templates
│   │   FrequencyChartGenerator.ts - Generator wykresy frekwencji 
│   │   GroupedPercentAndDataChartGenerator.ts - Generator wykresu dla ocen 1-5 lub TAK NIE
│   │   keep-html.pipe.ts - pipe, który nie usuwa unsafe HTML
│   │   lcs.ts - funkcja, która ustala najdłuższy wspólny substring
│   │   LinearCustomDataChartGenerator.ts - generator wykresu liniwoweg z własnymi danymi
│   │   LoginGuard.ts
│   │   mock.service.spec.ts
│   │   mock.service.ts - mockowe dane
│   │   MultipleBarsChartGenerator.ts - Generator wykresu ocen
│   │   MultipleChoiceChartGenerator.ts - generator wykresów dla pytań wielokrotnego wyboru
│   │   report-generator.service.spec.ts
│   │   reports.service.ts - endpointy dla raportów (save itd.)
│   │   sharing.service.spec.ts
│   │   sharing.service.ts - endpointy dla udostępniania
│   │   survey-generator.service.spec.ts
│   │   survey-generator.service.ts
│   │   surveys.service.spec.ts
│   │   surveys.service.ts - endpointy dla ankiet (save itd.)
│   │   user.service.spec.ts
│   │   user.service.ts - endpointy dla usera i jego cache
│   │
│   ├───account-not-exists - komponent wyświetlający się gdy user nie ma uprawnień do logowania
│   │       account-not-exists.component.spec.ts
│   │       account-not-exists.component.ts
│   │
│   ├───add-new-user - komponent z polami do dodania usera. Obsługa logiki jest w dashboard-modals.service
│   │       add-new-user.component.spec.ts
│   │       add-new-user.component.ts
│   │
│   ├───colors-and-order-selector - zawartość zakładki "kolejność i kolory" w edytorze
│   │       colors-and-order-selector.component.spec.ts
│   │       colors-and-order-selector.component.ts
│   │
│   ├───common-color-picker - popup wyświetlający się po kliknięciu "zmień kolor"
│   │       common-color-picker.component.spec.ts
│   │       common-color-picker.component.ts
│   │
│   ├───dashboard - komponent wyświetlający dashboard
│   │       dashboard.component.css
│   │       dashboard.component.html
│   │       dashboard.component.spec.ts
│   │       dashboard.component.ts
│   │
│   ├───dataModels
│   │       DashboardRequestResponse.ts - model wyświetlany na dashboardzie
│   │       OrderSetting.ts - definicja obiektu zawierającego kolejność i funkcje pomocnicze
│   │       Query.ts - Definicja zapytania i funkcja ComplimentQuery wywoływana przy kazdym requeście o dane
│   │       ReportDefinition.ts - Definicja JSONa który jest zapisywany do pliku jako raport
│   │       ReportElement.ts - definicje elementów raportu - wykresu i textu
│   │       SingleQuestionTypesDefinition.ts - model używany przy przetwarzaniu danych
│   │       survey.ts
│   │       SurveyDefinition.ts
│   │       UserGroup.ts
│   │
│   ├───delete-confirm-modal - generyczny modal do usuwania dowolnego elementu. Logika dla kazdego rodzaju usuwania w dashboard-modals
│   │       delete-confirm-modal.component.css
│   │       delete-confirm-modal.component.html
│   │       delete-confirm-modal.component.spec.ts
│   │       delete-confirm-modal.component.ts
│   │
│   ├───dummy-chart  - placeholder gdy wykres nie może być pokazany
│   │       dummy-chart.component.css
│   │       dummy-chart.component.html
│   │       dummy-chart.component.spec.ts
│   │       dummy-chart.component.ts
│   │
│   ├───export-report-dialog
│   │       export-report-dialog.component.spec.ts
│   │       export-report-dialog.component.ts
│   │
│   ├───filters-selector - do uploadu plików, logika w dashboard-modals
│   │       filters-selector.component.spec.ts
│   │       filters-selector.component.ts
│   │
│   ├───global-dictionary-override-editor - nadpisywanie etykiet
│   │       global-dictionary-override-editor.component.css
│   │       global-dictionary-override-editor.component.spec.ts
│   │       global-dictionary-override-editor.component.ts
│   │
│   ├───global-sidemenu
│   │       global-sidemenu.component.spec.ts
│   │       global-sidemenu.component.ts
│   │
│   ├───grouped-bars-percentage-data-picker - do wpisywania ilośc osób na wydziale
│   │       grouped-bars-percentage-data-picker.component.spec.ts
│   │       grouped-bars-percentage-data-picker.component.ts
│   │
│   ├───groups-editor - edytor grup
│   │       groups-editor.component.spec.ts
│   │       groups-editor.component.ts
│   │
│   ├───groups-editor-page - edytor grup osadzony w template dashboardu
│   │       groups-editor-page.component.spec.ts
│   │       groups-editor-page.component.ts
│   │
│   ├───ignore-selector - wybieranie czego nie brac do obliczeń liczbowych
│   │       ignore-selector.component.css
│   │       ignore-selector.component.spec.ts
│   │       ignore-selector.component.ts
│   │
│   ├───line-chart-custom-data-picker - wpisywanie danych do wykresu liniowego
│   │       line-chart-custom-data-picker.component.spec.ts
│   │       line-chart-custom-data-picker.component.ts
│   │
│   ├───link-activator - strona, która otwiera się po wejściu na share link i odblokowywuje raport lub przekierowywuje na preview
│   │       link-activator.component.css
│   │       link-activator.component.html
│   │       link-activator.component.spec.ts
│   │       link-activator.component.ts
│   │
│   ├───local-question-dictionary-override-editor - nadpisywanie labeli tylko dla jednego pytania. Nie działa.
│   │       local-question-dictionary-override-editor.component.css
│   │       local-question-dictionary-override-editor.component.spec.ts
│   │       local-question-dictionary-override-editor.component.ts
│   │
│   ├───login-panel - strona wyświetlająca zaloguj się
│   │       login-panel.component.css
│   │       login-panel.component.html
│   │       login-panel.component.spec.ts
│   │       login-panel.component.ts
│   │
│   ├───new-group-dialog - komponent z polami do tworzenia grupy. Logika w dashboard-modals.service
│   │       new-group-dialog.component.spec.ts
│   │       new-group-dialog.component.ts
│   │
│   ├───new-report-dialog -  komponent z polami do tworzenia raportu. Logika w dashboard-modals.service
│   │       new-report-dialog.component.spec.ts
│   │       new-report-dialog.component.ts
│   │
│   ├───new-survey-dialog  komponent z polami do tworzenia ankiety. Logika w dashboard-modals.service
│   │       new-survey-dialog.component.spec.ts
│   │       new-survey-dialog.component.ts
│   │
│   ├───report-preview - wyświetlanie podglądu raportu
│   │       report-preview.component.css
│   │       report-preview.component.html
│   │       report-preview.component.spec.ts
│   │       report-preview.component.ts
│   │
│   ├───report-tile - ikonka raportu na dasboardzie
│   │       report-tile.component.spec.ts
│   │       report-tile.component.ts
│   │
│   ├───reports 
│   │   │   reports.module.ts
│   │   │
│   │   ├───chart-editor-view - wyświetlanie wykresu i edytora wykresu
│   │   │       chart-editor-view.component.spec.ts
│   │   │       chart-editor-view.component.ts
│   │   │
│   │   ├───editor - wyświetlanie edytora raportów
│   │   │       editor.component.css
│   │   │       editor.component.html
│   │   │       editor.component.spec.ts
│   │   │       editor.component.ts
│   │   │
│   │   └───text-editor-view - widok segmentu tekstowego
│   │           text-editor-view.component.spec.ts
│   │           text-editor-view.component.ts
│   │
│   ├───share-report - dialog wyskakujący przy udostępnianiu raportu. Samo udostępnianie po kliknięciu "ok' w dashboard-modals
│   │       share-report.component.spec.ts
│   │       share-report.component.ts
│   │
│   ├───survey-tile - ikonka ankiety
│   │       survey-tile.component.spec.ts
│   │       survey-tile.component.ts
│   │
│   ├───surveys-editor - edytor ankiet
│   │       surveys-editor.component.css
│   │       surveys-editor.component.html
│   │       surveys-editor.component.spec.ts
│   │       surveys-editor.component.ts
│   │       surveys-editor.module.ts
│   │
│   ├───user-indicator - nazwa usera w prawym górnym rogu
│   │       user-indicator.component.css
│   │       user-indicator.component.html
│   │       user-indicator.component.spec.ts
│   │       user-indicator.component.ts
│   │
│   └───user-search-combobox - wyszukiwanie userów
│           user-search-combobox.component.spec.ts
│           user-search-combobox.component.ts
│
├───assets
│   │   .gitkeep
│   │   answers_count.png
│   │   Continuous-Animations_guidelines.gif
│   │   Gilroy-ExtraBold.otf
│   │   Gilroy-Light.otf
│   │   logoAnkieter.PNG
│   │   logoAnkieter2.png
│   │   ocena_lata.png
│   │   preset1.png
│   │   preset2.png
│   │   preset3.png
│   │   preset4.png
│   │   time_left.png
│   │   wydzialy.png
│   │
│   └───justify
│       │   plugin.js
│       │
│       └───icons
│           │   justifyblock.png
│           │   justifycenter.png
│           │   justifyleft.png
│           │   justifyright.png
│           │
│           └───hidpi
│                   justifyblock.png
│                   justifycenter.png
│                   justifyleft.png
│                   justifyright.png
│
└───environments
        environment.prod.ts
        environment.ts```
