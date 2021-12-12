import { ActionFunction, json, redirect } from '@remix-run/server-runtime';
import { useActionData } from 'remix';
import { object } from 'yup';
import { db } from '~/utils/db.server';

type ActionData = {
  formError?: string;
  fieldsError?: {
    name?: string;
    content?: string;
  };
  fields?: {
    name?: string;
    content?: string;
  };
};

const validateName = (name: string) => {
  if (name.length < 2) {
    return 'The joke Name is too short';
  }
};

const validateContent = (content: string) => {
  if (content.length < 10) {
    return 'The joke Content is too short';
  }
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export let action: ActionFunction = async ({ request }) => {
  const formdata = await request.formData();
  const name = formdata.get('name');
  const content = formdata.get('content');

  if (typeof name !== 'string' || typeof content !== 'string') {
    return badRequest({ formError: 'Form is not submitted correctly' });
  }

  const fieldsError = {
    name: validateName(name),
    content: validateContent(content),
  };

  const fields = { name, content };

  if (Object.values(fieldsError).some(Boolean)) {
    return badRequest({ fieldsError, fields });
  }

  const joke = await db.joke.create({ data: fields });
  return redirect(`jokes/${joke.id}`);
};

export default function NewJokeRoute() {
  const actionData = useActionData<ActionData>();

  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form method="post">
        <div>
          <label>
            Name: <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Content: <textarea name="content" />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
