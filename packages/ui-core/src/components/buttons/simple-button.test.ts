import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import SimpleButton from './simple-button.svelte';

test('button with event', async () => {
	const user = userEvent.setup();
	const onClick = vi.fn();

	const { component } = render(SimpleButton);
	component.$on('click', onClick);

	const button = screen.getByRole('button');
	await user.click(button);

	expect(onClick).toHaveBeenCalledOnce();
});
