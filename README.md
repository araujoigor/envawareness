# EnvAwareness - Because manual tests on the wrong environment can be just disastrous

So you've just finished a new feature for your website. All your unit tests are done.
Everything seems just perfect.

Then you decide to play a little with the feature as a
human user, to play with some real data on your homologation environment before
showing your masterpiece to your client/boss.

The problem is that you decide do reuse that old browser tab opened on your website.
But you forgot that it was actually browsing your PRODUCTION environment.
And during your little fun-time you mess up with real production data... Someone
will crush you, for sure...

Who never? The struggle is real...

**EnvAwareness** is a browser modern extension (based on WebExtensions) that
aims to prevent things like that to happen.

It lets you define domains for three different **environments**:

* Production
* Homologation (Testing)
* Development

Letting you also define a background color and a text color for each environment.

Every time you open a URL that matches one domain that was defined, the extension
will add a notification bar on the bottom of the page with the defined colors,
so you never forget which environment you are really browsing.

It is meant to work on any browser that supports the WebExtension standard.

## Instalation
  * Firefox:
    * https://addons.mozilla.org/en-US/firefox/addon/envawareness/
  * Chrome:
    * I'm not willing to pay 5 bucks to Google in order to publish this addon on Chrome WebStore. Therefore, you could:
      1. Wait for someone to publish it.
      2. Install this addon as a developer:
        1. Copy the source code of this repository somewhere.
        2. In Chrome, open chrome://extensions/
        3. Click on the (check) **Developer mode** checkbox.
        4. Click on **Load unpacked extension…** button.
        5. Navigate to the extension’s folder and click OK

## Libraries used
This project uses the following libraries to accomplish its goals:
  * jQuery (https://github.com/jquery/jquery)
  * Materialize (https://github.com/Dogfalo/materialize)
  * tinyColorPicker (http://www.dematte.at/tinyColorPicker/index.html)

## Credits
  Igor Carvalho de Araújo (:
