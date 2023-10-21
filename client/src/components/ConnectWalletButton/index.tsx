import React from "react";
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { Button, Box, CircularProgress, Menu, MenuItem } from "@mui/material";

const ConnectWalletButton: React.FC<{}> = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const { connectors, connect, isLoading } = useConnect();
  const { disconnect } = useDisconnect();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = () => {
    handleClose();
    disconnect();
  }


  if (isConnected) {
    return (
      <>
        <Button
          id="basic-button"
          variant="contained"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
        </Menu>
      </>
    );
  }

  if (isConnecting || isLoading) {
    return (
      <CircularProgress />
    );
  }

  return (
    <Box display={"flex"}>
      <Button
        variant="contained"
        onClick={() => connect({ connector: connectors[0] })}
      >
        Connect Wallet
      </Button>
    </Box>
  );
}

export default ConnectWalletButton;