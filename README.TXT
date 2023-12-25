This is purely for my own learning, no industry practices here


document.addEventListener:
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener 
- part of the DOM API - used for web apps.
- part of document object obv
    - document is a global object that represents the html
    - Tree of objects (so I guess it's DSA)
    - Objects constitute the document.
- addEventListener:
    - "listens" for an event, then executes the body.
    - arguments: (eventType, eventHandler)
        - eventType: specifies type of event. Can be DOMContentLoaded:
            - starts when document is opened - kinda like C preprocessor.
        - eventHandler: another function, called when the event (above) occurs.
        - events can be found here: https://developer.mozilla.org/en-US/docs/Web/Events
document.getElementById lines:
    - https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById 
    - another part of the DOM API
    - retrieves a reference type to an HTML element on the page using an ID. 
        - the arguments of these functions are the ID's of the things we want. 
    - the function will return null or the id of the element we want.
    - this element is then accessible in our HTML script. 
        - the HTML script defines what it APPEARS as to the user
        - THe JS part dictates the FUNCTION of these elements. 


NOTIFICATION STUFF:
https://moshfeu.medium.com/notifications-in-chrome-extension-50aac17b3b7d
https://blog.shahednasser.com/how-to-send-notifications-in-chrome-extensions/