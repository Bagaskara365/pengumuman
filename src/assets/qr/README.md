# QR Code Images

This directory contains QR code images used in the Bandhayudha announcement portal.

## Required Files

### whatsapp-group.jpg

- **Purpose**: QR code for WhatsApp group invitation
- **Format**: JPG/JPEG image
- **Recommended Size**: 400x400 pixels or larger (square aspect ratio)
- **Usage**: Displayed when participants are accepted for internship

## Setup Instructions

1. Generate a QR code for your WhatsApp group link using any QR code generator
2. Save the QR code image as `whatsapp-group.jpg` in this directory
3. Ensure the image is square (equal width and height) for best display
4. The system will automatically display this QR code for accepted participants

## Fallback Behavior

If the `whatsapp-group.jpg` file is not found, the system will display a placeholder message instead.

## Technical Notes

- The QR code is displayed within a 200x200px container by default
- The image is automatically resized to fit the container while maintaining aspect ratio
- The component includes proper error handling for missing images
