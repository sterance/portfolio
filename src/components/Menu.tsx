import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaDownload, FaEye } from 'react-icons/fa';
import { theme } from '../styles/theme';

const muiTheme = createTheme();

export type CvFile = {
  label: string;
  viewUrl: string;
  downloadUrl: string;
  downloadName: string;
}

type BasicMenuProps = {
  label: string;
  files: CvFile[];
};

export default function BasicMenu({ label, files }: BasicMenuProps) {
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleView = (viewUrl: string) => {
    window.open(viewUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = (downloadUrl: string, downloadName: string) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <div style={{ display: 'inline' }}>
        <Button
          id={buttonId}
          aria-controls={open ? menuId : undefined}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={handleClick}
          sx={{
            minWidth: 0, padding: 0, color: 'inherit', fontFamily: 'inherit',
            fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit',
            textTransform: 'none', verticalAlign: 'baseline',
            '&:hover': { backgroundColor: 'transparent' },
          }}
        >
          {label}
        </Button>
        <Menu
          id={menuId}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{ list: { 'aria-labelledby': buttonId } }}
        >
          {files.map((file) => (
            <MenuItem
              key={file.label}
              sx={{
                display: 'flex', alignItems: 'center', gap: 2, minWidth: 120,
                '& .menu-action': { opacity: 0.5, transition: 'opacity 150ms ease, color 150ms ease' },
                '& .view-action': { color: theme.colors.accent, opacity: 1 },
                '&:has(.download-action:hover) .view-action': { color: 'inherit', opacity: 0.5 },
                '&:has(.download-action:hover) .download-action': { color: theme.colors.accent, opacity: 1 },
              }}
            >
              <span>{file.label}</span>
              <span style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
                <IconButton
                  className="menu-action view-action"
                  aria-label={`View ${file.label}`}
                  title={`View ${file.label}`}
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleView(file.viewUrl);
                    handleClose();
                  }}
                >
                  <FaEye size={14} />
                </IconButton>
                <IconButton
                  className="menu-action download-action"
                  aria-label={`Download ${file.label}`}
                  title={`Download ${file.label}`}
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDownload(file.downloadUrl, file.downloadName);
                    handleClose();
                  }}
                >
                  <FaDownload size={14} />
                </IconButton>
              </span>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </ThemeProvider>
  );
}
