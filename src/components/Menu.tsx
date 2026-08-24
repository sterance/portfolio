import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaDownload, FaEye } from 'react-icons/fa';
import { theme } from '../styles/theme';

const muiTheme = createTheme();

type BasicMenuProps = {
  label: string;
  menuItems: string[];
};

export default function BasicMenu({ label, menuItems }: BasicMenuProps) {
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
            minWidth: 0,
            padding: 0,
            color: 'inherit',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            lineHeight: 'inherit',
            textTransform: 'none',
            verticalAlign: 'baseline',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          {label}
        </Button>
        <Menu
          id={menuId}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': buttonId,
            },
          }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item}
              onClick={handleClose}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                minWidth: 120,
                '& .menu-action': {
                  opacity: 0.5,
                  transition: 'opacity 150ms ease, color 150ms ease',
                },
                '& .view-action': {
                  color: theme.colors.accent,
                  opacity: 1,
                },
                '&:has(.download-action:hover) .view-action': {
                  color: 'inherit',
                  opacity: 0.5,
                },
                '&:has(.download-action:hover) .download-action': {
                  color: theme.colors.accent,
                  opacity: 1,
                },
              }}
            >
              <span>{item}</span>
              <span style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
                <IconButton
                  className="menu-action view-action"
                  aria-label={`View ${item}`}
                  title={`View ${item}`}
                  size="small"
                  onClick={(event) => event.stopPropagation()}
                >
                  <FaEye size={14} />
                </IconButton>
                <IconButton
                  className="menu-action download-action"
                  aria-label={`Download ${item}`}
                  title={`Download ${item}`}
                  size="small"
                  onClick={(event) => event.stopPropagation()}
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
