# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-04-18

### Added

- Add google social sign in and remove email verification
- Add blog dynamic route with ISR.
- Add root page with posts and authentication buttons

## [0.2.0] - 2025-04-17

### Added

- Add 'admin/editor' page to display post table
- Add master image and draft support for editor
- Add image insert support with position in editor
- Add optimistic updates in image selector
- Add suspense blocks for editor and image selector with refactoring
- Add image upload functionality with vercel blob and image uploader
- Add server action to delete post
- Add post table, action to update a post and ISR for editor/[slug]
- Add submit action to print the editor form values to the console
- Add basic editor page with tiptap editor component

### Changed

- Update admin route and replace it with editor
- Update editor to allow slug updation

### Fixed

- Change selection background color of input fields in auth pages

## [0.1.1] - 2025-03-16

### Added

- Add withRole middleware for role based access control
- Add middleware to check if already signed in with cookies
- Add email verification function during sign up using resend
- Add auth/sign-in page with sign in server action
- Add auth/sign-up page with sign up server action
- Add drizzle-orm and better-auth setup and generate auth schema

### Changed

- Update CHANGELOG.md

[1.0.0]: https://github.com///compare/v0.2.0..v1.0.0
[0.2.0]: https://github.com///compare/v0.1.1..v0.2.0
[0.1.1]: https://github.com///compare/v0.1.0..v0.1.1

<!-- generated by git-cliff -->
