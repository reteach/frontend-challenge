# Responsiveness

Options:
- Make the screen use the size of the container and rearrange with CSS
- Use container queries
- Css grid
- Flex wrap the elements
- Use media queries ( Bonus to not do this way )

My solution:
I opted to use @container with grid, and for images I would use srcset with sizes. I prefer to user grid on layout elements because that can be also something Design you benefit, specially to understand how the grid interacts and is rendered, in some previous projects I asked designers to set grids on Figma, and that worked well as they knew how a 12 grid would look like and how the layout elements would behave or be positioned.

I would also recommend to start design always thinking in a responsive way, mobile first would help a lot to understand where the elements should stay and how they change shape and placement.

# Gallery Performace

Possible Improvements
- Load by visible chunks on the client side
	- The components that checks if it is within acceptable render range could be a base component for other areas inside the application as well, so we could reuse it.
	- Make every User section check if it is within a Y space from the start of the screen,  when the user scrolls close enough render the elements inside.
	- The same logic can be applied to remove hide items afterwards, the only important aspect would be to maintain the container width/height afterwards.
- Limit the visible amount of gallery items and create a "See more" button leading the user inside the user specific galleries.
	- Perhaps a fixed amount of max items would be a good approach.
- Caching the data from Gallery also could be a way to improve performance on future re-render.
- Requesting every user individually might also be making the performance dip a bit, perhaps having an API that could reply all items at once already populated makes it a better.
- Avoid getting more data than necessary, the gallery request is bringing also all posts, comments and albums from the User, it should only bring the values necessary and not the objects as that isn't rendered.

# Accessibility

The application is making usage of most tags in HTML and not only using divs for every scenario. Even thou I would probably check on the case of Loading/Error if there is a better way to notify that something changed on the screen.

The application also would benefit from having predefined tab control so the users could traverse it more easily. That would probably also require a definition being done on the Design side.

The Gallery would require some major changes as it seemed difficult to traverse as currently there isn't much interaction on it.

Improvements:

What I would start by doing is creating base(atoms) components with accessibility in mind in the first place. Buttons, inputs and other interactive components should always come with a multiple required accessible props being default practice. Later I would create bigger components(molecules) that reuse the base components and improve the usage inside themselves by using predefined tabs to help the user journey on the app.

I would also recommend to run periodic tests to see how the accessibility on the app is going, and check for best practices to add on the everyday routine to prevent components to lack accessibility.

# Nuxt as API

- Continue with the current setup (BFF)
	- I would continue with this setup as long as the application requires to have good SEO and faster load on slow clients, specially if first load is very important.
- Move the all logic into the client-side
	- Moving the logic without having a BFF is a mistake by itself, the client side would expose the DB and make it easy to access.
	- If the application already had a API to contact and use as a buffer I would perhaps think on this a bit longer.
- Use a static site generation (SSG) approach
	- SSG would't be much viable for dynamic content and it tends to be more headache to maintain than SSR, specially as Nuxt lets you have Prerender.
- Any other approach that can simplify or quickly optimize the current implementation
	- Possible other way of implementing this would be to run as SPA and some API in the BE as BFF, if the search engines isn't as much of importance and the application doesn't need to be expose to it.
	- By having an SPA we would have more loads of Javascript happening but that could also mean that we are freer to choose a BE that is considerate faster, and some of the load in processing would be part of the client and not on our side anymore.
	- By having a SPA we would not need Nuxt as a meta-framework probably.

Could Nuxt be used as a full backend? In what scenarios would that make sense, and what might be the limitations?
Reply: For small applications I believe it could be useful, but I would refrain from having it access directly the DB to avoid possible security issues even thou they shouldn't be visible in the client side, I would prefer to have a buffer Api and use the BFF to interact with this or other Apis, this way masking the connections made.
The performance will also be bound to Node.js and Nuxt overall performance , and that could be a issue in the future if there is too much demand and not enough resources. It could be that in the future there is a bigger need for performance and that would lead to rewriting in a BE language focused on performance, specially as all clients are making multiple requests that create a necessity to render html before sending it to the client.
